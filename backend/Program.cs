using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ── ASP.NET Identity ────────────────────────────────────────
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
{
    opts.Password.RequiredLength = 12;
    opts.Password.RequireUppercase = true;
    opts.Password.RequireLowercase = true;
    opts.Password.RequireDigit = true;
    opts.Password.RequireNonAlphanumeric = true;

    opts.Lockout.MaxFailedAccessAttempts = 5;
    opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    opts.Lockout.AllowedForNewUsers = true;

    opts.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(opts =>
{
    opts.Cookie.HttpOnly = true;
    opts.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
    opts.Cookie.SameSite = SameSiteMode.Lax;
    opts.Cookie.Name = "BeaconAuth";
    opts.ExpireTimeSpan = TimeSpan.FromHours(8);
    opts.SlidingExpiration = true;

    opts.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    opts.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://intex2-1.vercel.app",
                "https://intex-backend-hehbb8gwb2e3b8b6.westus2-01.azurewebsites.net")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// ── Seed Identity roles and test accounts ───────────────────
using (var scope = app.Services.CreateScope())
{
    await IdentitySeeder.SeedAsync(scope.ServiceProvider);
}

// DB connection is tested via /api/health — no startup check needed
// (Startup checks corrupt the Npgsql connection pool with Supabase pooler)

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// ── Security headers ────────────────────────────────────────
app.Use(async (context, next) =>
{
    context.Response.Headers.Append(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://www.google-analytics.com https://*.supabase.co; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "frame-ancestors 'none'; " +
        "form-action 'self'; " +
        "base-uri 'self'"
    );
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});

// ── Cache-control for auth endpoints ────────────────────────
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/api/auth"))
    {
        context.Response.Headers.Append("Cache-Control", "no-store, no-cache, must-revalidate");
        context.Response.Headers.Append("Pragma", "no-cache");
    }
    await next();
});

app.UseAuthentication();
app.UseAuthorization();

// ── Auth endpoints ──────────────────────────────────────────

app.MapPost("/api/auth/login", async (
    SignInManager<ApplicationUser> signInManager,
    UserManager<ApplicationUser> userManager,
    HttpContext httpContext) =>
{
    var body = await httpContext.Request.ReadFromJsonAsync<LoginRequest>();
    if (body == null || string.IsNullOrWhiteSpace(body.Email) || string.IsNullOrWhiteSpace(body.Password))
        return Results.BadRequest(new { error = "Email and password are required." });

    var user = await userManager.FindByEmailAsync(body.Email);
    if (user == null)
        return Results.BadRequest(new { error = "Invalid email or password." });

    if (await userManager.IsLockedOutAsync(user))
    {
        var lockoutEnd = await userManager.GetLockoutEndDateAsync(user);
        return Results.Json(new
        {
            error = "Account temporarily locked. Try again later.",
            lockoutEnd = lockoutEnd?.UtcDateTime.ToString("o")
        }, statusCode: 423);
    }

    var result = await signInManager.PasswordSignInAsync(user, body.Password, body.RememberMe, lockoutOnFailure: true);
    if (!result.Succeeded)
    {
        if (result.IsLockedOut)
            return Results.Json(new { error = "Account temporarily locked due to multiple failed login attempts. Try again in 15 minutes." }, statusCode: 423);
        return Results.BadRequest(new { error = "Invalid email or password." });
    }

    var roles = await userManager.GetRolesAsync(user);
    return Results.Ok(new
    {
        email = user.Email,
        firstName = user.FirstName,
        lastName = user.LastName,
        roles
    });
});

app.MapPost("/api/auth/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok(new { message = "Logged out" });
}).RequireAuthorization();

app.MapGet("/api/auth/me", async (
    HttpContext httpContext,
    UserManager<ApplicationUser> userManager) =>
{
    if (httpContext.User.Identity?.IsAuthenticated != true)
        return Results.Ok(new { isAuthenticated = false });

    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
        return Results.Ok(new { isAuthenticated = false });

    var roles = await userManager.GetRolesAsync(user);
    return Results.Ok(new
    {
        isAuthenticated = true,
        email = user.Email,
        firstName = user.FirstName,
        lastName = user.LastName,
        roles
    });
});

// ── Health endpoint ─────────────────────────────────────────

app.MapGet("/api/health", async (AppDbContext db) =>
{
    // NOTE: Do NOT use db.Database.CanConnectAsync() or ExecuteSqlRawAsync() here.
    // Both have issues with Supabase connection pooler + Npgsql.
    // Use a normal EF Core query instead.
    var canConnect = false;
    try
    {
        await db.Safehouses.Select(s => s.SafehouseId).FirstOrDefaultAsync();
        canConnect = true;
    }
    catch { }

    var assembly = System.Reflection.Assembly.GetExecutingAssembly();
    var buildDate = System.IO.File.GetLastWriteTimeUtc(assembly.Location).ToString("yyyy-MM-dd HH:mm:ss UTC");

    return new
    {
        status = canConnect ? "ok" : "degraded",
        database = canConnect ? "connected" : "unreachable",
        environment = app.Environment.EnvironmentName,
        version = assembly.GetName().Version?.ToString() ?? "unknown",
        buildDate,
        endpoints = new[] {
            "/api/health",
            "/api/auth/login",
            "/api/auth/logout",
            "/api/auth/me",
            "/api/impact/summary",
            "/api/impact/donations-by-month",
            "/api/impact/allocations-by-program",
            "/api/impact/education-trends",
            "/api/impact/health-trends",
            "/api/impact/safehouses",
            "/api/impact/snapshots",
            "/api/admin/metrics",
            "/api/admin/residents",
            "/api/admin/recent-donations",
            "/api/admin/donations-by-channel",
            "/api/admin/active-residents-trend",
            "/api/admin/flagged-cases-trend"
        }
    };
});

// ── IMPORTANT: DbContext is NOT thread-safe. ──────────────
// Do NOT use Task.WhenAll() with multiple queries on the same DbContext.
// Always await queries sequentially (one at a time).
// Using Task.WhenAll causes ObjectDisposedException with Supabase pooler + Npgsql.
//
// var x = await db.Table1.CountAsync();
//    var y = await db.Table2.CountAsync();

// ── Public endpoints (Impact page, Home page) ──────────────

app.MapGet("/api/impact/summary", async (AppDbContext db) =>
{
    var r = await db.Residents
        .GroupBy(_ => 1)
        .Select(g => new
        {
            total = g.Count(),
            active = g.Count(r => r.CaseStatus == "Active"),
            completed = g.Count(r => r.ReintegrationStatus == "Completed")
        })
        .FirstOrDefaultAsync() ?? new { total = 0, active = 0, completed = 0 };

    var activeSafehouses = await db.Safehouses.CountAsync(s => s.Status == "Active");
    var totalDonations = await db.Donations.SumAsync(d => (decimal?)d.Amount ?? 0);

    return new
    {
        totalResidents = r.total,
        activeResidents = r.active,
        activeSafehouses,
        totalDonations,
        completedReintegrations = r.completed,
        reintegrationRate = r.total > 0 ? Math.Round((double)r.completed / r.total * 100) : 0
    };
});

app.MapGet("/api/impact/donations-by-month", async (AppDbContext db) =>
{
    var data = await db.Donations
        .Where(d => d.DonationDate != null && d.Amount != null)
        .GroupBy(d => new { d.DonationDate!.Value.Year, d.DonationDate!.Value.Month })
        .Select(g => new
        {
            year = g.Key.Year,
            month = g.Key.Month,
            total = g.Sum(d => (decimal?)d.Amount ?? 0),
            count = g.Count()
        })
        .OrderBy(x => x.year).ThenBy(x => x.month)
        .ToListAsync();

    return data;
});

app.MapGet("/api/impact/allocations-by-program", async (AppDbContext db) =>
{
    var data = await db.DonationAllocations
        .Where(a => a.ProgramArea != null)
        .GroupBy(a => a.ProgramArea)
        .Select(g => new
        {
            area = g.Key,
            amount = g.Sum(a => (decimal?)a.AmountAllocated ?? 0)
        })
        .OrderByDescending(x => x.amount)
        .ToListAsync();

    return data;
});

app.MapGet("/api/impact/education-trends", async (AppDbContext db) =>
{
    var data = await db.EducationRecords
        .Where(e => e.RecordDate != null && e.ProgressPercent != null)
        .GroupBy(e => new { e.RecordDate!.Value.Year, e.RecordDate!.Value.Month })
        .Select(g => new
        {
            year = g.Key.Year,
            month = g.Key.Month,
            avgProgress = Math.Round(g.Average(e => (double?)e.ProgressPercent ?? 0), 1)
        })
        .OrderBy(x => x.year).ThenBy(x => x.month)
        .ToListAsync();

    return data;
});

app.MapGet("/api/impact/health-trends", async (AppDbContext db) =>
{
    var data = await db.HealthWellbeingRecords
        .Where(h => h.RecordDate != null && h.GeneralHealthScore != null)
        .GroupBy(h => new { h.RecordDate!.Value.Year, h.RecordDate!.Value.Month })
        .Select(g => new
        {
            year = g.Key.Year,
            month = g.Key.Month,
            avgHealth = Math.Round(g.Average(h => (double?)h.GeneralHealthScore ?? 0), 2)
        })
        .OrderBy(x => x.year).ThenBy(x => x.month)
        .ToListAsync();

    return data;
});

app.MapGet("/api/impact/safehouses", async (AppDbContext db) =>
{
    var data = await db.Safehouses
        .Select(s => new
        {
            s.SafehouseId,
            s.SafehouseCode,
            s.Name,
            s.Region,
            s.City,
            s.Status,
            s.CapacityGirls,
            s.CurrentOccupancy
        })
        .ToListAsync();

    return data;
});

app.MapGet("/api/impact/snapshots", async (AppDbContext db) =>
{
    var data = await db.PublicImpactSnapshots
        .Where(s => s.IsPublished == true)
        .OrderByDescending(s => s.SnapshotDate)
        .Take(12)
        .Select(s => new
        {
            s.SnapshotDate,
            s.Headline,
            s.SummaryText,
            s.MetricPayloadJson
        })
        .ToListAsync();

    return data;
});

// ── Admin endpoints ────────────────────────────────────────

app.MapGet("/api/admin/metrics", async (AppDbContext db) =>
{
    var now = DateTime.UtcNow;
    var startOfMonth = new DateOnly(now.Year, now.Month, 1);
    var startOfLastMonth = startOfMonth.AddMonths(-1);

    var activeResidents = await db.Residents.CountAsync(r => r.CaseStatus == "Active");

    var incidents = await db.IncidentReports
        .Where(i => i.Resolved != true)
        .GroupBy(_ => 1)
        .Select(g => new
        {
            total = g.Count(),
            critical = g.Count(i => i.Severity == "Critical"),
            high = g.Count(i => i.Severity == "High")
        })
        .FirstOrDefaultAsync() ?? new { total = 0, critical = 0, high = 0 };

    var currentMonth = await db.Donations
        .Where(d => d.DonationDate >= startOfMonth)
        .GroupBy(_ => 1)
        .Select(g => new
        {
            total = g.Sum(d => (decimal?)d.Amount ?? 0),
            count = g.Count()
        })
        .FirstOrDefaultAsync() ?? new { total = 0m, count = 0 };

    var lastMonthDonations = await db.Donations
        .Where(d => d.DonationDate >= startOfLastMonth && d.DonationDate < startOfMonth)
        .SumAsync(d => (decimal?)d.Amount ?? 0);

    var nextConference = await db.InterventionPlans
        .Where(p => p.CaseConferenceDate > DateOnly.FromDateTime(now))
        .OrderBy(p => p.CaseConferenceDate)
        .Select(p => p.CaseConferenceDate)
        .FirstOrDefaultAsync();

    var upcomingConferences = await db.InterventionPlans
        .CountAsync(p => p.CaseConferenceDate > DateOnly.FromDateTime(now));

    var donationChange = lastMonthDonations > 0
        ? Math.Round((double)(currentMonth.total - lastMonthDonations) / (double)lastMonthDonations * 100, 1)
        : 0;

    var openIncidents = incidents.total;
    var criticalIncidents = incidents.critical;
    var highIncidents = incidents.high;
    var monthlyDonations = currentMonth.total;
    var monthlyDonationCount = currentMonth.count;

    return new
    {
        activeResidents,
        openIncidents,
        criticalIncidents,
        highIncidents,
        monthlyDonations,
        monthlyDonationCount,
        donationChange,
        upcomingConferences,
        nextConference
    };
});

app.MapGet("/api/admin/residents", async (AppDbContext db) =>
{
    var data = await db.Residents
        .Where(r => r.CaseStatus == "Active")
        .OrderByDescending(r => r.CurrentRiskLevel == "Critical" ? 0 :
                                r.CurrentRiskLevel == "High" ? 1 :
                                r.CurrentRiskLevel == "Medium" ? 2 : 3)
        .ThenByDescending(r => r.DateOfAdmission)
        .Take(20)
        .Select(r => new
        {
            r.InternalCode,
            safehouse = db.Safehouses
                .Where(s => s.SafehouseId == r.SafehouseId)
                .Select(s => s.SafehouseCode + " " + s.City)
                .FirstOrDefault(),
            r.CaseCategory,
            r.CurrentRiskLevel,
            r.DateOfAdmission,
            r.AssignedSocialWorker,
            lastSession = db.ProcessRecordings
                .Where(p => p.ResidentId == r.ResidentId)
                .OrderByDescending(p => p.SessionDate)
                .Select(p => p.SessionDate)
                .FirstOrDefault()
        })
        .ToListAsync();

    return data;
});

app.MapGet("/api/admin/recent-donations", async (AppDbContext db) =>
{
    var data = await db.Donations
        .OrderByDescending(d => d.DonationDate)
        .Take(5)
        .Select(d => new
        {
            supporter = db.Supporters
                .Where(s => s.SupporterId == d.SupporterId)
                .Select(s => s.DisplayName)
                .FirstOrDefault(),
            d.DonationType,
            d.Amount,
            d.EstimatedValue,
            d.DonationDate,
            d.CampaignName
        })
        .ToListAsync();

    return data;
});

app.MapGet("/api/admin/donations-by-channel", async (AppDbContext db) =>
{
    var data = await db.Supporters
        .Where(s => s.AcquisitionChannel != null)
        .GroupBy(s => s.AcquisitionChannel)
        .Select(g => new
        {
            channel = g.Key,
            count = g.Count()
        })
        .OrderByDescending(x => x.count)
        .ToListAsync();

    return data;
});

app.MapGet("/api/admin/active-residents-trend", async (AppDbContext db) =>
{
    var data = await db.SafehouseMonthlyMetrics
        .Where(m => m.MonthStart != null)
        .GroupBy(m => new { m.MonthStart!.Value.Year, m.MonthStart!.Value.Month })
        .Select(g => new
        {
            year = g.Key.Year,
            month = g.Key.Month,
            count = g.Sum(m => (int?)m.ActiveResidents ?? 0)
        })
        .OrderBy(x => x.year).ThenBy(x => x.month)
        .ToListAsync();

    return data;
});

app.MapGet("/api/admin/flagged-cases-trend", async (AppDbContext db) =>
{
    var data = await db.SafehouseMonthlyMetrics
        .Where(m => m.MonthStart != null)
        .GroupBy(m => new { m.MonthStart!.Value.Year, m.MonthStart!.Value.Month })
        .Select(g => new
        {
            year = g.Key.Year,
            month = g.Key.Month,
            count = g.Sum(m => (int?)m.IncidentCount ?? 0)
        })
        .OrderBy(x => x.year).ThenBy(x => x.month)
        .ToListAsync();

    return data;
});

app.Run();

// ── Request DTOs ────────────────────────────────────────────

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; }
}

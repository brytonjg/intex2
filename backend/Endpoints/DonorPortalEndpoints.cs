using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class DonorPortalEndpoints
{
    public static void MapDonorPortalEndpoints(this WebApplication app)
    {
        app.MapGet("/api/donor/my-donations", async (
            HttpContext httpContext,
            UserManager<ApplicationUser> userManager,
            AppDbContext db) =>
        {
            var appUser = await userManager.GetUserAsync(httpContext.User);
            if (appUser?.SupporterId == null)
                return Results.Ok(new { supporter = (object?)null, donations = Array.Empty<object>(), allocations = Array.Empty<object>() });

            var sid = appUser.SupporterId.Value;

            var supporter = await db.Supporters
                .Where(s => s.SupporterId == sid)
                .Select(s => new
                {
                    s.SupporterId,
                    s.DisplayName,
                    s.FirstName,
                    s.LastName,
                    s.SupporterType,
                    s.Status,
                    s.FirstDonationDate,
                })
                .FirstOrDefaultAsync();

            var donations = await db.Donations
                .Where(d => d.SupporterId == sid)
                .OrderByDescending(d => d.DonationDate)
                .Select(d => new
                {
                    d.DonationId,
                    d.DonationType,
                    d.DonationDate,
                    d.Amount,
                    d.EstimatedValue,
                    d.CurrencyCode,
                    d.IsRecurring,
                    d.CampaignName,
                    d.ChannelSource,
                })
                .ToListAsync();

            var donationIds = donations.Select(d => d.DonationId).ToList();

            var allocations = await db.DonationAllocations
                .Where(a => donationIds.Contains(a.DonationId))
                .Select(a => new
                {
                    a.DonationId,
                    a.ProgramArea,
                    a.AmountAllocated,
                    safehouseName = db.Safehouses
                        .Where(s => s.SafehouseId == a.SafehouseId)
                        .Select(s => s.Name ?? s.SafehouseCode)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Results.Ok(new { supporter, donations, allocations });
        }).RequireAuthorization();

        // ── Donation processing ──────────────────────────────────

        app.MapPost("/api/donate/process", async (HttpContext httpContext, AppDbContext db) =>
        {
            var body = await httpContext.Request.ReadFromJsonAsync<CreateCheckoutRequest>();
            if (body == null) return Results.BadRequest(new { error = "Request body is required." });
            var (valid, err) = DtoValidator.Validate(body);
            if (!valid) return Results.BadRequest(new { error = err });

            var donation = new backend.Models.Donation
            {
                DonationType = "Monetary",
                DonationDate = DateOnly.FromDateTime(DateTime.UtcNow),
                ChannelSource = "Online",
                CurrencyCode = "USD",
                Amount = (body.AmountCents ?? 0) / 100m,
                IsRecurring = body.Mode == "recurring",
                Notes = $"Online donation: {body.Mode}" + (body.Cadence != null ? $" ({body.Cadence})" : "")
            };
            db.Donations.Add(donation);
            await db.SaveChangesAsync();

            // Auto-subscribe to newsletter if opted in
            if (body.Newsletter && !string.IsNullOrEmpty(body.DonorEmail))
            {
                var existingSub = await db.NewsletterSubscribers
                    .FirstOrDefaultAsync(s => s.Email == body.DonorEmail.ToLowerInvariant());
                if (existingSub != null)
                {
                    existingSub.IsActive = true;
                }
                else
                {
                    db.NewsletterSubscribers.Add(new backend.Models.NewsletterSubscriber
                    {
                        Email = body.DonorEmail.ToLowerInvariant(),
                        SubscribedAt = DateTime.UtcNow,
                        IsActive = true
                    });
                }
                await db.SaveChangesAsync();
            }

            return Results.Ok(new
            {
                amount = (body.AmountCents ?? 0) / 100m,
                isRecurring = body.Mode == "recurring",
                email = body.DonorEmail
            });
        });
    }
}

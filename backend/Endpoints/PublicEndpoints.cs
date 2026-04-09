using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class PublicEndpoints
{
    public static void MapPublicEndpoints(this WebApplication app)
    {
        // ── Health endpoint ─────────────────────────────────────────

        app.MapGet("/api/health", async (AppDbContext db) =>
        {
            // NOTE: Use a normal EF Core query to verify connectivity.
            var canConnect = false;
            try
            {
                await db.Safehouses.Select(s => s.SafehouseId).FirstOrDefaultAsync();
                canConnect = true;
            }
            catch { }

            return new
            {
                status = canConnect ? "ok" : "degraded",
                database = canConnect ? "connected" : "unreachable",
                timestamp = DateTime.UtcNow.ToString("o")
            };
        });

        // ── Public Impact endpoints ──────────────────────────────

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
            var totalDonations = await db.Donations
                .Where(d => d.DonationDate <= AppConstants.DataCutoff)
                .SumAsync(d => (decimal?)d.Amount ?? 0);

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
                .Where(d => d.DonationDate != null && d.Amount != null && d.DonationDate <= AppConstants.DataCutoff)
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
                .Where(a => a.ProgramArea != null && (a.AllocationDate == null || a.AllocationDate <= AppConstants.DataCutoff))
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
                .Where(e => e.RecordDate != null && e.ProgressPercent != null && e.RecordDate <= AppConstants.DataCutoff)
                .GroupBy(e => new { e.RecordDate!.Value.Year, e.RecordDate!.Value.Month })
                .Select(g => new
                {
                    year = g.Key.Year,
                    month = g.Key.Month,
                    avgProgress = Math.Round(g.Average(e => (double?)e.ProgressPercent ?? 0), 1),
                    avgAttendance = Math.Round(g.Average(e => (double?)e.AttendanceRate ?? 0), 1)
                })
                .OrderBy(x => x.year).ThenBy(x => x.month)
                .ToListAsync();

            return data;
        });

        app.MapGet("/api/impact/education-summary", async (AppDbContext db) =>
        {
            var enrollmentBreakdown = await db.EducationRecords
                .Where(e => e.EnrollmentStatus != null)
                .GroupBy(e => e.EnrollmentStatus)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();
            var completionBreakdown = await db.EducationRecords
                .Where(e => e.CompletionStatus != null)
                .GroupBy(e => e.CompletionStatus)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();
            return new { enrollmentBreakdown, completionBreakdown };
        });

        app.MapGet("/api/impact/health-trends", async (AppDbContext db) =>
        {
            var data = await db.HealthWellbeingRecords
                .Where(h => h.RecordDate != null && h.GeneralHealthScore != null && h.RecordDate <= AppConstants.DataCutoff)
                .GroupBy(h => new { h.RecordDate!.Value.Year, h.RecordDate!.Value.Month })
                .Select(g => new
                {
                    year = g.Key.Year,
                    month = g.Key.Month,
                    avgHealth = Math.Round(g.Average(h => (double?)h.GeneralHealthScore ?? 0), 2),
                    avgNutrition = Math.Round(g.Average(h => (double?)h.NutritionScore ?? 0), 2),
                    avgSleep = Math.Round(g.Average(h => (double?)h.SleepQualityScore ?? 0), 2),
                    avgEnergy = Math.Round(g.Average(h => (double?)h.EnergyLevelScore ?? 0), 2)
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
    }
}

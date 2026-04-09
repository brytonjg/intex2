using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services;

public class PostReadinessJob : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<PostReadinessJob> _logger;

    public PostReadinessJob(IServiceProvider services, ILogger<PostReadinessJob> logger)
    {
        _services = services;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var now = DateTime.UtcNow;

                // Move scheduled posts to ready_to_publish when their time arrives
                var readyPosts = await db.AutomatedPosts
                    .Where(p => p.Status == "scheduled" && p.ScheduledAt != null && p.ScheduledAt <= now)
                    .ToListAsync(stoppingToken);

                foreach (var post in readyPosts)
                {
                    post.Status = "ready_to_publish";
                    post.UpdatedAt = now;
                }

                // Move expired snoozed posts back to draft
                var expiredSnoozes = await db.AutomatedPosts
                    .Where(p => p.Status == "snoozed" && p.SnoozedUntil != null && p.SnoozedUntil <= now)
                    .ToListAsync(stoppingToken);

                foreach (var post in expiredSnoozes)
                {
                    post.Status = "draft";
                    post.SnoozedUntil = null;
                    post.UpdatedAt = now;
                }

                if (readyPosts.Count > 0 || expiredSnoozes.Count > 0)
                {
                    await db.SaveChangesAsync(stoppingToken);
                    _logger.LogInformation("PostReadinessJob: {Ready} posts moved to ready, {Snoozed} snoozes expired.",
                        readyPosts.Count, expiredSnoozes.Count);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PostReadinessJob error.");
            }

            await Task.Delay(TimeSpan.FromMinutes(15), stoppingToken);
        }
    }
}

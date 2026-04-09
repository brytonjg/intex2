namespace backend.Models;

public class NewsletterSubscriber
{
    public int NewsletterSubscriberId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Name { get; set; }
    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
    public string UnsubscribeToken { get; set; } = Guid.NewGuid().ToString("N");
    public bool IsActive { get; set; } = true;
}

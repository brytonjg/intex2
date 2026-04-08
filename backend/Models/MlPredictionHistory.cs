namespace backend.Models;

public class MlPredictionHistory
{
    public long Id { get; set; }
    public string EntityType { get; set; } = null!;
    public int? EntityId { get; set; }
    public string ModelName { get; set; } = null!;
    public string? ModelVersion { get; set; }
    public decimal? Score { get; set; }
    public string? ScoreLabel { get; set; }
    public DateTime PredictedAt { get; set; }
    public string? Metadata { get; set; }
}

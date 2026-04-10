using System.Text.Json;
using backend.Data;

namespace backend.Endpoints;

public static class ChatbotEndpoints
{
    public static void MapChatbotEndpoints(this WebApplication app)
    {
        app.MapPost("/api/chat/ask", async (
            HttpContext ctx,
            AppDbContext db,
            IConfiguration config) =>
        {
            // Read the user's safehouse access
            var allowed = await SafehouseAuth.GetAllowedSafehouseIds(ctx, db);

            // Parse the request body
            var body = await ctx.Request.ReadFromJsonAsync<JsonElement>();
            if (body.ValueKind == JsonValueKind.Undefined
                || !body.TryGetProperty("question", out var questionProp))
            {
                return Results.BadRequest(new { error = "Missing 'question' field." });
            }
            var question = questionProp.GetString();
            if (string.IsNullOrWhiteSpace(question))
            {
                return Results.BadRequest(new { error = "Question cannot be empty." });
            }

            // Build the request to forward to the Vanna service
            var vannaUrl = config["VannaService:Url"] ?? "http://localhost:8002";
            var vannaKey = config["VannaService:ApiKey"] ?? "";

            using var httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
            if (!string.IsNullOrEmpty(vannaKey))
                httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {vannaKey}");

            var payload = new
            {
                question,
                safehouse_ids = allowed  // null for admins, List<int> for staff
            };

            try
            {
                var resp = await httpClient.PostAsJsonAsync($"{vannaUrl}/ask", payload);

                if (!resp.IsSuccessStatusCode)
                {
                    return Results.StatusCode(503);
                }

                var result = await resp.Content.ReadFromJsonAsync<JsonElement>();
                return Results.Ok(result);
            }
            catch (TaskCanceledException)
            {
                return Results.Json(
                    new { error = "The query took too long. Try a simpler question." },
                    statusCode: 504);
            }
            catch (HttpRequestException)
            {
                return Results.Json(
                    new { error = "The data assistant is currently unavailable. Please try again later." },
                    statusCode: 503);
            }
        }).RequireAuthorization(p => p.RequireRole("Admin", "Staff"));
    }
}

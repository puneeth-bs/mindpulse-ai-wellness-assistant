using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using ChatBotApp.Models;

namespace ChatBotApp.Services;

public class OpenAiChatService : IOpenAiChatService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;

    public OpenAiChatService(IConfiguration config)
    {
        _apiKey = config["OpenAI:ApiKey"] ?? throw new Exception("OpenAI API key not found.");
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async Task<ChatResponse> GetResponseAsync(string question)
    {
        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = "You are a compassionate and supportive mental wellness assistant. You help users cope with stress, anxiety, and emotional well-being. Offer thoughtful responses, deep breathing exercises, mindfulness techniques, and empathetic support. Avoid giving medical or clinical advice. Avoid from answering any other kind of questions." },
                new { role = "user", content = question }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json");

        var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);

        if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
        {
            return new ChatResponse("Rate limit exceeded. Try again later.");
        }

        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseString);
        var answer = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return new ChatResponse(answer ?? "No response.");
    }
}

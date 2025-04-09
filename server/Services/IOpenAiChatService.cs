using ChatBotApp.Models;

namespace ChatBotApp.Services;

public interface IOpenAiChatService
{
    Task<ChatResponse> GetResponseAsync(string question);
}

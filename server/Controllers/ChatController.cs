using Microsoft.AspNetCore.Mvc;
using ChatBotApp.Models;
using ChatBotApp.Services;

namespace ChatBotApp.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IOpenAiChatService _chatService;

    public ChatController(IOpenAiChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Post([FromBody] ChatRequest request)
    {
        var response = await _chatService.GetResponseAsync(request.Question);
        return Ok(response);
    }
}

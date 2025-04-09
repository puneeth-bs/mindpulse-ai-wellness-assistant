using ChatBotApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Load OpenAI API key from config (via appsettings or env)
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"];
Console.WriteLine("API KEY: " + openAiApiKey);

// Register services
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<IOpenAiChatService, OpenAiChatService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapControllers();

app.Run();

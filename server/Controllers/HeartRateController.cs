using HeartRateAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HeartRateAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeartRateController : ControllerBase
    {
        private readonly HeartRateService _service;

        public HeartRateController()
        {
            _service = new HeartRateService();
        }

        [HttpGet]
        public async Task<IActionResult> GetHeartRate()
        {
            double bpm = await _service.CalculateHeartRateAsync();
            return Ok(new { HeartRate = bpm, Timestamp = DateTime.Now });
        }
    }
}

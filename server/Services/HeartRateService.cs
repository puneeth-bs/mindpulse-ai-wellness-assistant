using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Threading.Tasks;

namespace HeartRateAPI.Services
{
    public class HeartRateService
    {
        private readonly string portName = "/dev/cu.usbmodem1201"; // Update as needed
        private readonly int baudRate = 115200;
        private SerialPort serialPort;

        public async Task<double> CalculateHeartRateAsync(int durationSeconds = 30)
        {
            List<double> bpmValues = new List<double>();
            serialPort = new SerialPort(portName, baudRate)
            {
                ReadTimeout = 1000
            };

            serialPort.Open();
            DateTime startTime = DateTime.Now;

            while ((DateTime.Now - startTime).TotalSeconds < durationSeconds)
            {
                try
                {
                    string line = serialPort.ReadLine();
                    if (double.TryParse(line.Trim(), out double bpm) && bpm > 30 && bpm < 180)
                    {
                        bpmValues.Add(bpm);
                    }
                }
                catch (TimeoutException)
                {
                    // Skip any read timeouts
                }
                await Task.Delay(50); // Avoid hammering Serial
            }

            serialPort.Close();

            if (bpmValues.Count == 0)
                return 0;

            return Math.Round(bpmValues.Average(), 2);
        }
    }
}

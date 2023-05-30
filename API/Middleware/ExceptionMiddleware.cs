using Application.Core;
using System;
using System.Text.Json;
using System.Threading.Tasks;
namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
               await _next.Invoke(context);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode=(int)StatusCodes.Status500InternalServerError;
                var response = _env.IsDevelopment() ?
                    new AppException(500, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(500, "Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                var json=JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);

            }

        }

    }
}

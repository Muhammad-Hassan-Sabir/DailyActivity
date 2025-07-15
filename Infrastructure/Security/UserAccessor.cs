using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetUserId()
        {
            return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public string GetUsername()
        {
            return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
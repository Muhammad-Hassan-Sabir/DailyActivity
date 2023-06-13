using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsHostRequirment:IAuthorizationRequirement
    {
    }
    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {
        private readonly DataContext dataContext;
        private readonly IHttpContextAccessor httpContext;

        public IsHostRequirmentHandler(DataContext dataContext,IHttpContextAccessor httpContext)
        {
            this.dataContext = dataContext;
            this.httpContext = httpContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null) return Task.CompletedTask;

            var activityId =Guid.Parse(httpContext.HttpContext?.Request.RouteValues.FirstOrDefault(x => x.Key == "id").Value?.ToString());


            var attendee = dataContext.ActivityAttendees.AsNoTracking().SingleOrDefaultAsync(x=>x.ActivityId==activityId && x.AppUserId== userId ).Result;
            
            if (attendee is null) return Task.CompletedTask;

            if(attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}

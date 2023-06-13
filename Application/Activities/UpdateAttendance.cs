using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        private class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context,IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);
                if (activity is null) return null;

                var user = await context.Users
                    .FirstOrDefaultAsync(x=>x.UserName==userAccessor.GetUsername());
                if (user is null) return null;

                var hostUsername = activity.Attendees.FirstOrDefault(x=>x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                if(attendance !=null && hostUsername != user.UserName)
                {
                    activity.Attendees.Remove(attendance);
                }
                else
                if(attendance is null )
                {
                    attendance = new ActivityAttendee
                    {
                        Activity = activity,
                        AppUser = user,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }

                var res = await context.SaveChangesAsync() > 0;

                return res ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem in updating attendance");
            }
        }
    }
}

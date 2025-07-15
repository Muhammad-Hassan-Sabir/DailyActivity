using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            public string Message { get; set; }
        }

        public class  Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext dataContext;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext dataContext ,IUserAccessor userAccessor, IMapper mapper)
            {
                this.dataContext = dataContext;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userName = userAccessor.GetUsername();
                var user = await dataContext.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == userName);
                if (user is null) return null;


                var activity = await dataContext.Activities.FindAsync(request.ActivityId);
                if (activity is null) return null;

                var comment = new Comment
                {
                    Message = request.Message,
                    Activity = activity,
                    User = user,
                };
                activity.Comments.Add(comment);
                var result = await dataContext.SaveChangesAsync() > 0;

                if (!result) return Result<CommentDto>.Failure("Failed to create comment.");

                return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));

            }
        }
    }
}

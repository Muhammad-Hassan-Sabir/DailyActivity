using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Profile>>
        {
            public UpdatedProfile Profile { get; set; }
        }

        public class CommandValidator : AbstractValidator<UpdatedProfile>
        {
           public CommandValidator()
            {
                RuleFor(x=>x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Profile>>
        {
            private readonly DataContext DataContext;
            private readonly IMapper Mapper;
            private readonly IUserAccessor UserAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                DataContext = dataContext;
                Mapper = mapper;
                UserAccessor = userAccessor;
            }
            public async Task<Result<Profile>> Handle(Command request, CancellationToken cancellationToken)
            {
                var username = UserAccessor.GetUsername();
                var user = await DataContext.Users.Include(x=>x.Photos).FirstOrDefaultAsync(x => x.UserName == username);
                if (user is null) return null;
                //var alreadyExist = await DataContext.Users.AnyAsync(x => x.DisplayName == request.Profile.DisplayName);
                //if (alreadyExist)
                //    return Result<UpdatedProfile>.Failure("Same display name already exist. Please choose another one.");
                if (user.DisplayName == request.Profile.DisplayName && user.Bio == request.Profile.Bio)
                {
                    return Result<Profile>.Failure("No changes were made.");
                }
                user.DisplayName = request.Profile.DisplayName;
                user.Bio = request.Profile.Bio;
                //user.UserName = request.Profile.DisplayName;
                var result =await DataContext.SaveChangesAsync() > 0;
                if (!result) return Result<Profile>.Failure("Problem updating profile");
                var profile = Mapper.Map<Profile>(user);
                return Result<Profile>.Success(profile);
            }
        }

    }
}

﻿using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(x => x.Photos)
                            .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user is null) return null;

                var photo=user.Photos.FirstOrDefault(x=>x.Id == request.Id);

                if (photo is null) return null;

                var mainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

                if (mainPhoto != null) mainPhoto.IsMain = false;

                photo.IsMain = true;

                var success = await context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem setting main photo.");
            }
        }
    }
}

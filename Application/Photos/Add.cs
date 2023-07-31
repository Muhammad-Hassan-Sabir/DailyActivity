using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            private readonly DataContext context;

            public Handler(IPhotoAccessor photoAccessor, IUserAccessor userAccessor, DataContext context)
            {
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                            .Include(x => x.Photos)
                            .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user is null) return null;

                var photoUploadResult = await photoAccessor.AddPhoto(request.File);
                if (photoUploadResult != null)
                {
                    var photo = new Photo
                    {
                        Id = photoUploadResult.PublicId,
                        Url = photoUploadResult.Url,
                    };

                    if (!user.Photos.Any()) photo.IsMain = true;

                    user.Photos.Add(photo);

                    var result = await context.SaveChangesAsync() > 0;
                    if (result) return Result<Photo>.Success(photo);
                    return Result<Photo>.Failure("Problem while adding photo");

                }
                else
                {
                    return Result<Photo>.Failure("Problem while adding photo");

                }


            }
        }

    }
}

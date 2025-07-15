using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                                            .Include(x => x.User).ThenInclude(x => x.Photos)
                                            .Where(x => x.Activity.Id == request.ActivityId)
                                            .OrderBy(x => x.CreatedAt)
                                            .ToListAsync();
                var commentDtos = mapper.Map<List<CommentDto>>(comments);
                return Result<List<CommentDto>>.Success(commentDtos);
            }
        }

    }
}

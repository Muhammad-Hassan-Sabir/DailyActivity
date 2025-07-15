using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services
            , IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"));
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(Application.Activities.List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();

            return services;
        }
    }
}
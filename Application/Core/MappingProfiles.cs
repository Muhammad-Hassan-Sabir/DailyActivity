﻿using Application.Activities;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(x => x.HostUsername,
                o => o.MapFrom(a => a.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(x => x.Username, o => o.MapFrom(x => x.AppUser.UserName))
                .ForMember(x => x.Bio, o => o.MapFrom(x => x.AppUser.Bio))
                .ForMember(x => x.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName));
         

        }
    }
}
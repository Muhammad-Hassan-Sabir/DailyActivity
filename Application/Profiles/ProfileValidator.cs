using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ProfileValidator:AbstractValidator<UpdatedProfile>
    {
        public ProfileValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}

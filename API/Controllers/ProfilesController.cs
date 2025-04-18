using Application.Profiles;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ProfilesController : BaseApiController
    {

        [HttpGet("{userName}")]
        public async Task<IActionResult> Profiles(string userName)
        {
            var result = await Mediator.Send(new Details.Query { Username=userName });
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> EditProfile(UpdatedProfile profile)
        {
            var result=await Mediator.Send(new Edit.Command { Profile = profile });
            return HandleResult(result);
           
        }



    }
}

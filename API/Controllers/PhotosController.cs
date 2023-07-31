using Application.Photos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromForm] Add.Command command)
        {
            var result = await Mediator.Send(command);

            return HandleResult(result);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeletePhoto(string Id)
        {
            var result=await Mediator.Send(new Delete.Command { Id = Id });
            return HandleResult(result);
        }

        [HttpPost("{Id}/setMain")]
        public async Task<IActionResult> SetMain(string Id)
        {
            var result = await Mediator.Send(new SetMain.Command { Id = Id });
            return HandleResult(result);
        }


    }
}

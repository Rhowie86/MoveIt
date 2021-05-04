using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoveIt.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoveIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MoveController : ControllerBase
    {
        private readonly IMoveRepository _moveRepository;
        private readonly IUserProfileRepository _userProfileRepository;

            public MoveController(
                IMoveRepository moveRepository,
                IUserProfileRepository userProfileRepository)
        {
            _moveRepository = moveRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_moveRepository.GetAllMoves());
        }

    }
}

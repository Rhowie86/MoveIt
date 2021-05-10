using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoveIt.Models;
using MoveIt.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            var currentUser = GetCurrentUser();
            return Ok(_moveRepository.GetAllMoves(currentUser.Id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var move = _moveRepository.GetMoveById(id);
            if (move == null)
            {
                return NotFound();
            }
            return Ok(move);
        }

        [HttpPost]
        public IActionResult Create(Move move)
        {
            var user = GetCurrentUser();

            move.UserId = user.Id;
            _moveRepository.Add(move);
                return CreatedAtAction("Get", new { id = move.Id }, move);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Move move)
        {
            if(id != move.Id)
            {
                return BadRequest();
            }
            _moveRepository.Update(move);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _moveRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}


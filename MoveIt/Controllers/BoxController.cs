using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;

using MoveIt.Models;
using MoveIt.Repositories;
using System.Security.Claims;

namespace MoveIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class BoxController : ControllerBase
    {
        private readonly IBoxRepository _boxRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public BoxController(
            IBoxRepository boxRepository, IUserProfileRepository userProfileRepository)
        {
            _boxRepository = boxRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_boxRepository.GetAllBoxesByMoveId(id));
        }

        [HttpGet("/boxId/{boxId}")]
        public IActionResult GetByBoxId(int boxId)
        {
            var box = _boxRepository.GetBoxById(boxId);
            if (box == null)
            {
                return NotFound();
            }
            return Ok(box);
        }

        [HttpPost]
        public IActionResult Create(Box box)
        {
            _boxRepository.Add(box);
            return CreatedAtAction("Get", new { id = box.Id }, box);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Box box)
        {
            if (id != box.Id)
            {
                return BadRequest();
            }
            _boxRepository.Update(box);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _boxRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }


}

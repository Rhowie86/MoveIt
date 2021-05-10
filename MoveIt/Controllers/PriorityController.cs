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

    public class PriorityController : ControllerBase
    {
        private readonly IPriorityRepository _priorityRepository;
        private readonly IUserProfileRepository _userProfileRepository

        public PriorityController(
            IPriorityRepository priorityRepository, IUserProfileRepository userProfileRepository)
        {
            _priorityRepository = priorityRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_priorityRepository.GetAllPriorities());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var priority = _priorityRepository.GetPriorityById(id);
            if (priority == null)
            {
                return NotFound();
            }
            return Ok(priority);
        }

        [HttpPost]
        public IActionResult Create(Priority priority)
        {
            _priorityRepository.Add(priority);
            return CreatedAtAction("Get", new { id = priority.Id }, priority);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Priority priority)
        {
            if (id != priority.Id)
            {
                return BadRequest();
            }
            _priorityRepository.Update(priority);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _priorityRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }


}

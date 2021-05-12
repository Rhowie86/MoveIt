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

    public class AreaController : ControllerBase
    {
        private readonly IAreaRepository _areaRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public AreaController(
            IAreaRepository areaRepository, IUserProfileRepository userProfileRepository)
        {
            _areaRepository = areaRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_areaRepository.GetAllAreas());
        }

        [HttpGet("{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var area = _areaRepository.GetAreaByUser(userId);
            if ( area == null)
            {
                return NotFound();
            }
            return Ok(area);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var area = _areaRepository.GetAreaById(id);
            if (area == null)
            {
                return NotFound();
            }
            return Ok(area);
        }

        [HttpPost]
        public IActionResult Create(Area area)
        {
            _areaRepository.Add(area);
            return CreatedAtAction("Get", new { id = area.Id }, area);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Area area)
        {
            if (id != area.Id)
            {
                return BadRequest();
            }
            _areaRepository.Update(area);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _areaRepository.Delete(id);
            return NoContent();
        }
    private UserProfile GetCurrentUser()
    {
        var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
    }
    }


}

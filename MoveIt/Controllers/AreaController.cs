using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;

using MoveIt.Models;
using MoveIt.Repositories;

namespace MoveIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AreaController : ControllerBase
    {
        private readonly IAreaRepository _areaRepository;

        public AreaController(
            IAreaRepository areaRepository)
        {
            _areaRepository = areaRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_areaRepository.GetAllAreas());
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
    }

}

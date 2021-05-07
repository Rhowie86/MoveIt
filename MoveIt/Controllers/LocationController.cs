using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoveIt.Models;
using MoveIt.Repositories;

namespace MoveIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationController(
            ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_locationRepository.GetAllLocations());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var location = _locationRepository.GetLocationById(id);
            if(location == null)
            {
                return NotFound();
            }
            return Ok(location);
        }

        [HttpPost]
        public IActionResult Create(Location location)
        {
            _locationRepository.Add(location);
            return CreatedAtAction("Get", new { id = location.Id }, location);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Location location)
        {
            if (id != location.Id)
            {
                return BadRequest();
            }
            _locationRepository.Update(location);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _locationRepository.Delete(id);
            return NoContent();
        }
    }

}

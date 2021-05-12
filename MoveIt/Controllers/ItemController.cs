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
    
    
    public class ItemController : ControllerBase
    {
        private readonly IMoveRepository _moveRepository;
        private readonly IBoxRepository _boxRepository;
        private readonly IPriorityRepository _priorityRepository;
        private readonly IAreaRepository _areaRepository;
        private readonly IItemRepository _itemRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ItemController(
            IMoveRepository moveRepository,
            IUserProfileRepository userProfileRepository,
            IBoxRepository boxRepository,
            IPriorityRepository priorityRepository,
            IAreaRepository areaRepository,
            IItemRepository itemRepository)
        {
            _moveRepository = moveRepository;
            _boxRepository = boxRepository;
            _priorityRepository = priorityRepository;
            _areaRepository = areaRepository;
            _itemRepository = itemRepository;
            _userProfileRepository = userProfileRepository;
        }

        

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var move = _moveRepository.GetMoveById(id);
            var listItems =_itemRepository.GetAllItemsByMoveId(move.Id);
            if (move == null)
            {
                return NotFound();
            }
            return Ok(listItems);
        }

        [HttpPost]
        public IActionResult Create(Item item)
        {
            var user = GetCurrentUser();

            item.UserId = user.Id;
            _itemRepository.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            _itemRepository.Update(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _itemRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}


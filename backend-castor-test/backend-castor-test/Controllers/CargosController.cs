using Microsoft.EntityFrameworkCore;


using Microsoft.AspNetCore.Mvc;
using backend_castor_test.Data;

namespace backend_castor_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargosController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CargosController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("All/")]
        public async Task<IActionResult> All()
        {

            var cargoList = await _context.Cargo.ToListAsync();

            return Ok(cargoList);

        }

    }
}

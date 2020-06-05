using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using API.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class SimulationController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SimulationInput input)
        {
            try
            {
                var service = new DerivativeService();
                var result = service.ComputeSimulation(input);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                            new
                            {
                                Message = "Ocorreu um erro interno. Tente novamente"
                            });
            }
        }
    }
}
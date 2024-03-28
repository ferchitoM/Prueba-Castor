using Microsoft.EntityFrameworkCore;
using backend_castor_test.Models;

using Microsoft.AspNetCore.Mvc;
using backend_castor_test.Data;
using System;
using System.IO;

namespace backend_castor_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public EmpleadosController(AplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            this._environment = environment;


        }

        [HttpGet]
        [Route("All/")]
        public async Task<IActionResult> All()
        {

            var empleadoList = await
                _context.Empleados
                .OrderBy(l => l.Nombre)
                .ToListAsync();

            return Ok(empleadoList);

        }

        [HttpGet]
        [Route("Show/{id}")]
        public async Task<IActionResult> Show(int id)
        {

            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }
            return Ok(empleado);

        }


        [HttpPost]
        public async Task<IActionResult> New(NewEmpleadoRequest request)
        {
            if (_context.Empleados.Any(p => p.Nombre == request.Nombre) 
                || _context.Empleados.Any(p => Math.Truncate(p.Cedula) == request.Cedula))
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Este empleado ya existe.");
            }

            var empleado = new Empleado
            {
                Nombre = request.Nombre,
                Cedula = request.Cedula,
                FechaIngreso = request.FechaIngreso,
                Foto = request.ImageName,
                CargoId = request.CargoId
            };

            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, empleado.Id);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateEmployeeRequest request)
        {
            if (_context.Empleados
                    .Where(p => p.Id != request.Id)
                    .Any(p => p.Nombre == request.Nombre)
                || 
                _context.Empleados
                    .Where(p => p.Id != request.Id)
                    .Any(p => Math.Truncate(p.Cedula) == request.Cedula))
                {
                return StatusCode(StatusCodes.Status401Unauthorized, "Este empleado ya existe.");
            }

            var empleado = await _context.Empleados.FirstOrDefaultAsync(p => p.Id == request.Id);

            empleado!.Nombre = request.Nombre;
            empleado!.Cedula = request.Cedula;
            empleado!.FechaIngreso = request.FechaIngreso;
            empleado!.Foto = request.ImageName;
            empleado!.CargoId = request.CargoId;

            await _context.SaveChangesAsync();

            DeleteOldImages(empleado.Id, empleado.Foto);

            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empleado = await _context.Empleados.FirstOrDefaultAsync(p => p.Id == id);

            DeleteFolder(empleado!.Id);

            _context.Empleados.Remove(empleado!);
            await _context.SaveChangesAsync();


            return StatusCode(StatusCodes.Status200OK);
        }

        private void DeleteOldImages(int IdEmpleado, string FileName)
        {
            string[] filePaths = Directory.GetFiles(GetFilePath() + IdEmpleado.ToString());

            foreach (string filePath in filePaths)
            {
                var name = new FileInfo(filePath).Name;
                name = name.ToLower();

                Console.WriteLine($"{name} {FileName}");

                if (name.ToLower() != FileName.ToLower())
                {
                    Console.WriteLine("Eliminado!!!");

                    System.IO.File.Delete(filePath);
                }
            }
        }

        private void DeleteFolder(int IdEmpleado)
        {
            string folderPath = GetFilePath() + IdEmpleado.ToString();

            if (System.IO.Directory.Exists(folderPath))
            {
                System.IO.Directory.Delete(folderPath, true);
            }
                
        }

        [NonAction]
        private string GetFilePath()
        {
            return this._environment.WebRootPath + "\\Uploads\\Empleados\\";
        }

    }
}

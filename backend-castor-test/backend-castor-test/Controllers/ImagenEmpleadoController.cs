using backend_castor_test.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Immutable;

namespace backend_castor_test.Controllers
{
    [Route("api/Empleados/[controller]")]
    [ApiController]
    public class ImagenEmpleadoController : Controller
    {
        private readonly AplicationDbContext _context;

        private readonly IWebHostEnvironment _environment;
        private readonly String HostUrl;

        public ImagenEmpleadoController(AplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            HostUrl = "https://localhost:7118/";

            this._environment = environment;


        }
        [HttpPost("UploadImage")]
        public async Task<ActionResult> UploadImage()
        {

            string Filename = "";

            try
            {
                var _uploadedfiles = Request.Form.Files;
                var IdEmpleado = Request.Form["id"];


                foreach (IFormFile source in _uploadedfiles)
                {
                    Filename = source.FileName;              
                    string Filepath = GetFilePath() + IdEmpleado + "\\";
                    string imagepath = Filepath + Filename;

                    if (!System.IO.Directory.Exists(Filepath))
                    {
                        System.IO.Directory.CreateDirectory(Filepath);
                    }

                    if (System.IO.File.Exists(imagepath))
                    {
                        System.IO.File.Delete(imagepath);
                    }
                    using (FileStream stream = System.IO.File.Create(imagepath))
                    {
                        await source.CopyToAsync(stream);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ha ocurrido un error al intentar guardar la imagen.");
            }

            return Ok(new { imageName = Filename });

        }

        [HttpGet("RemoveImage/{id}")]
        public async Task<ActionResult> RemoveImage(string id)
        {
            string Filepath = GetFilePath();
            string Imagepath = Filepath + "\\image.png";
            try
            {
                if (System.IO.File.Exists(Imagepath))
                {
                    System.IO.File.Delete(Imagepath);
                }
                return StatusCode(StatusCodes.Status200OK);

            }
            catch (Exception ext)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ha ocurrido un error al intentar eliminar la imagen.");

            }
        }

        [NonAction]
        private string GetFilePath()
        {
            return this._environment.WebRootPath + "\\Uploads\\Empleados\\";
        }
                
    }
}

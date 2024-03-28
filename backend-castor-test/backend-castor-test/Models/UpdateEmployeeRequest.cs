using System.ComponentModel.DataAnnotations;

namespace backend_castor_test.Models
{
    public class UpdateEmployeeRequest
    {
        public int Id { get; set; } = 0;

        [Required(ErrorMessage = "El campo Cédula es requerido.")]
        public decimal Cedula { get; set; } = 0;

        [Required(ErrorMessage = "El campo Nombre es requerido.")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "La Foto de perfil es requerida.")]
        public string Foto { get; set; } = string.Empty;

        public string ImageName { get; set; } = string.Empty;

        public DateTime FechaIngreso { get; set; } = DateTime.Now;
        public int CargoId { get; set; } = 0;
    }
}

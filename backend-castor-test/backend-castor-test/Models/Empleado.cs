using System.ComponentModel.DataAnnotations;

namespace backend_castor_test.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public Decimal Cedula { get; set; }
        public String? Nombre { get; set; }
        public String Foto { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FechaIngreso { get; set; }
        public int CargoId { get; set; }
        public Cargo? Cargo { get; set; }



    }
}

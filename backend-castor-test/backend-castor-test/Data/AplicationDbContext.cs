using backend_castor_test.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_castor_test.Data
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Cargo> Cargo { get; set; } = null!;
        public DbSet<Empleado> Empleados { get; set; } = null!;


    }
}

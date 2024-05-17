using CRUD_API_Angular.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_API_Angular.Data
{
    public class CardDbContext : DbContext
    {
        public CardDbContext(DbContextOptions options) : base(options)
        {

        }

        //Dbset
        public DbSet<Card> Cards { get; set; }
    }
}

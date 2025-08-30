using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace ToDoList.Models
{
    public partial class ToDoListEntityModel : DbContext
    {
        public ToDoListEntityModel()
            : base("name=ToDoListEntityModel")
        {
        }

        public DbSet<Gorev> Gorevler { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}

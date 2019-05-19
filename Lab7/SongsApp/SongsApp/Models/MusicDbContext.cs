using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SongsApp.Models
{
    public class MusicDbContext : DbContext
    {
        public MusicDbContext() : base("DefaultConnection") { }

        public System.Data.Entity.DbSet<SongsApp.Models.Song> Songs { get; set; }

        public System.Data.Entity.DbSet<SongsApp.Models.Genre> Genres { get; set; }
    }
}
using AddressBook.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Data
{
    public class AddressBookContext : DbContext
    {
        public AddressBookContext(DbContextOptions<AddressBookContext> options) : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Email> Emails { get; set; }

        public DbSet<Phone> Phones { get; set; }

        public DbSet<SocialMedia> SocialMedias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().Property(c => c.Title).HasConversion<string>().HasColumnType("varchar(5)");
            modelBuilder.Entity<Contact>().Property(c => c.ContactCategory).HasConversion<string>().HasColumnType("varchar(20)");
            modelBuilder.Entity<Contact>().Property(c => c.Gender).HasConversion<string>().HasColumnType("varchar(10)");
            modelBuilder.Entity<Contact>().Property(c => c.IsDeleted).HasColumnType("bit").HasDefaultValue(false);

            modelBuilder.Entity<Phone>().Property(c => c.ContactMethodType).HasConversion<string>().HasColumnType("varchar(20)");

            modelBuilder.Entity<Email>().Property(c => c.ContactMethodType).HasConversion<string>().HasColumnType("varchar(20)");
            
            modelBuilder.Entity<SocialMedia>().Property(c => c.SocialMediaType).HasConversion<string>().HasColumnType("varchar(10)");

            base.OnModelCreating(modelBuilder);

        }

    }
}

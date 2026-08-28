using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace AddressBook.Models
{
    public class Contact
    {
        [Key]
        public int ContactID { get; set; }

        [MaxLength(50)]
        [Unicode(false)]
        public required string FirstName { get; set; }

        [MaxLength(50)]
        [Unicode(false)]
        public string? LastName { get; set; }

        [MaxLength(50)]
        [Unicode(false)]
        public string? MiddleName { get; set; }

        public int Age { get; set; }

        public required DateOnly DateOfBirth { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        // removed as it is overlapping with status 
        //[MaxLength(50)]
        //[Unicode(false)]
        //public ContactStatus Status { get; set; }

        public bool IsDeleted { get; set; }

        // removed after discussing with abdul as we don't have login to get user
        //[MaxLength(50)]
        //[Unicode(false)]
        //public string? DeletedBy { get; set; }

        public DateTime? DeletedOn { get; set; }

        //[MaxLength(5)]
        //[Unicode(false)]
        public Title Title { get; set; }

        //[MaxLength(10)]
        //[Unicode(false)]
        public Gender Gender { get; set; }

        //[MaxLength(20)]
        //[Unicode(false)]
        public ContactCategory ContactCategory { get; set; }


        public List<Phone> Phones { get; } = new List<Phone>();

        public List<Email> Emails { get; } = new List<Email>();

        public List<SocialMedia> SocialMedias { get; } = new List<SocialMedia>();
    }
}

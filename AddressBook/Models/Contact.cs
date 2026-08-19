using System;
using System.Collections.Generic;
using System.Text;

namespace AddressBook.Models
{
    public class Contact
    {
        public int ContactID { get; set; }
        public required string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public required int Age { get; set; }
        public required DateOnly DateOfBirth { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string? DeletedBy { get; set; }
        public DateTime? DeletedOn { get; set; }


        public required int TitleID { get; set; }
        public Title Title { get; set; }


        public required int GenderID { get; set; }
        public Gender Gender { get; set; }


        public int ContactCategoryID { get; set; } 
        public ContactCategory ContactCategory { get; set; }


        public List<Phone> Phones { get; } = new List<Phone>();
        public List<Email> Emails { get; } = new List<Email>();
        public List<SocialMedia>? SocialMedias { get; } = new List<SocialMedia>();
    }
}

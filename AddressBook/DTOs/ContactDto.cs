using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using AddressBook.Models;


namespace AddressBook.DTOs
{
    public class ContactDto
    {
        public int ContactID { get; set; }

        [MaxLength(50)]
        public required string FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [MaxLength(50)]
        public string? MiddleName { get; set; }

        // DateOfBirth represented as ISO date string (yyyy-MM-dd) for frontend compatibility
        public required string DateOfBirth { get; set; }

        public Title Title { get; set; }

        public Gender Gender { get; set; }

        public ContactCategory ContactCategory { get; set; }


        public List<PhoneDto> Phones { get; set; } = new List<PhoneDto>();

        public List<EmailDto> Emails { get; set; } = new List<EmailDto>();

        public List<SocialMediaDto> SocialMedias { get; set; } = new List<SocialMediaDto>();
    }
}

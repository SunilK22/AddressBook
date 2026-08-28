using System.ComponentModel.DataAnnotations;
using AddressBook.Models;


namespace AddressBook.DTOs
{
    public class ContactDto
    {

        [MaxLength(50)]
        public required string FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [MaxLength(50)]
        public string? MiddleName { get; set; }

        public required DateOnly DateOfBirth { get; set; }

      
        public Title Title { get; set; }

        public Gender Gender { get; set; }

        public ContactCategory ContactCategory { get; set; }

        public List<PhoneDto> Phones { get; set; } = [];

        public List<EmailDto> Emails { get; set; } = [];

        public List<SocialMediaDto> SocialMedias { get; set; } = [];
    }
}

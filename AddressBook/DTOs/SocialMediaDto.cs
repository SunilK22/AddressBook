using AddressBook.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.DTOs
{
    public class SocialMediaDto
    {
        public int SocialMediaID { get; }

        [MaxLength(50)]
        public required string SocialMediaAddress { get; set; }

        public SocialMediaType SocialMediaType { get; set; }

    }
}

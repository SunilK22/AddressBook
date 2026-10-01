using AddressBook.Models;
using System.ComponentModel.DataAnnotations;


namespace AddressBook.DTOs
{
    public class PhoneDto
    {

        public int PhoneID { get; set; }

        [MaxLength(20)]
        public required string PhoneNumber { get; set; }

        public ContactMethodType ContactMethodType { get; set; }

    }
}

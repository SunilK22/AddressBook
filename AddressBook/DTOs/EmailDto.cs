using AddressBook.Models;
using System.ComponentModel.DataAnnotations;


namespace AddressBook.DTOs
{
    public class EmailDto
    {
        public int EmailAddressID { get; }

        [MaxLength(254)]
        public required string EmailAddress { get; set; }

        public ContactMethodType ContactMethodType { get; set; }

    }
}

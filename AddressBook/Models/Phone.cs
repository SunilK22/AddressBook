using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AddressBook.Models
{
    public class Phone
    {
        [Key]
        public int PhoneID { get; set; }

        [MaxLength(20)]
        [Unicode(false)]
        public required string PhoneNumber { get; set; }

        public ContactMethodType ContactMethodType { get; set; }


        [ForeignKey("Contact")]
        public int ContactID { get; set; }

        public required Contact Contact { get; set; }

    }
}

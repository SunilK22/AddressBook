using System.ComponentModel.DataAnnotations.Schema;

namespace AddressBook.Models
{
    public class Phone
    {
        public int PhoneID { get; set; }

        public required string PhoneNumber { get; set; }


        public int ContactMethodID { get; set; }

        public ContactMethodType ContactMethodType { get; set; }


        [ForeignKey("Contact")]
        public int ContactID { get; set; }

        public required Contact Contact { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AddressBook.Models
{
    public class Email
    {
        public int EmailAddressID { get; set; }

        public required string EmailAddress { get; set; }


        [ForeignKey("Contact")]
        public int ContactID { get; set; }

        public required Contact Contact { get; set; }


        public int ContactMethodTypeID { get; set; }

        public ContactMethodType ContactMethodType { get; set; }
    }
}

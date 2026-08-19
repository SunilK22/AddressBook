using System;
using System.Collections.Generic;
using System.Text;

namespace AddressBook.Models
{
    public class Email
    {
        public int EmailAddressID { get; set; }
        public required string EmailAddress { get; set; }


        public int ContactID { get; set; }
        public required Contact Contact { get; set; }

        public int ContactMethodTypeID { get; set; }
        public ContactMethodType ContactMethodType { get; set; }
    }
}

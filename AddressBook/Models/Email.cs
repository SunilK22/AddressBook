using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AddressBook.Models
{
    public class Email
    {
        [Key]
        public int EmailAddressID { get; set; }

        [MaxLength(254)]
        [Unicode(false)]
        public required string EmailAddress { get; set; }

        public ContactMethodType ContactMethodType { get; set; }

        [ForeignKey("Contact")]
        public int ContactID { get; set; }


        public required Contact Contact { get; set; }

    }
}

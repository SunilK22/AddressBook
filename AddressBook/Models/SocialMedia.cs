using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AddressBook.Models
{
    public class SocialMedia
    {
        [Key]
        public int SocialMediaID { get; set; }

        [MaxLength(50)]
        [Unicode(false)]
        public required string SocialMediaAddress { get; set; }

        public SocialMediaType SocialMediaType { get; set; }


        [ForeignKey("Contact")]
        public int ContactID { get; set; }

        public required Contact Contact { get; set; }

    }
}

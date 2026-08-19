using System;
using System.Collections.Generic;
using System.Text;

namespace AddressBook.Models
{
    public class SocialMedia
    {
        public int SocialMediaID { get; set; }
        public required string SocialMediaAddress { get; set; }


        public int SocialMediaTypeID { get; set; }
        public SocialMediaType SocialMediaType { get; set; }


        public int ContactID { get; set; }
        public required Contact Contact { get; set; }

    }
}

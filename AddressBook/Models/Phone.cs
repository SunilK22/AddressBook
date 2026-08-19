namespace AddressBook.Models
{
    public class Phone
    {
        public int PhoneID { get; set; }
        public required string PhoneNumber { get; set; }


        public int ContactMethodID { get; set; }
        public ContactMethodType ContactMethodType { get; set; }


        public int ContactID { get; set; }
        public required Contact Contact { get; set; }

    }
}

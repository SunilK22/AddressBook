using AddressBook.Data;
using AddressBook.DTOs;
using AddressBook.Models;
using Microsoft.EntityFrameworkCore;



namespace AddressBook.Repository
{
    public class ContactRepo : IContactRepo
    {
        private readonly AddressBookContext context;

        public ContactRepo(AddressBookContext context)
        {
            this.context = context;
        }



        private bool UpdateEmail(Contact contact, ContactDto contactDto)
        {
            var existingEmails = contact.Emails.ToList();

            // deleting phone from existing list
            foreach (var email in existingEmails)
            {
                var exists = contactDto.Emails.Any(p => p.EmailAddressID == email.EmailAddressID);
                if (!exists)
                {
                    contact.Emails.Remove(email);
                    return true;
                }

            }

            // to update or add new email
            foreach (var emaildto in contactDto.Emails)
            {
                var existingEmail = contact.Emails.FirstOrDefault(p => p.EmailAddressID == emaildto.EmailAddressID);

                if (existingEmail is null)
                {
                    var newEmail = new Email
                    {
                        Contact = contact,
                        EmailAddress = emaildto.EmailAddress,
                        ContactMethodType = emaildto.ContactMethodType
                    };
                    contact.Emails.Add(newEmail);
                }
                else
                {
                    existingEmail.EmailAddress = emaildto.EmailAddress;
                    existingEmail.ContactMethodType = emaildto.ContactMethodType;
                }
            }

            return true;
        }

        private bool UpdatePhone(Contact contact, ContactDto contactDto)
        {

            var existingPhones = contact.Phones.ToList();
            // deleting phone from existing list
            foreach (var phone in existingPhones)
            {
                var exists = contactDto.Phones.Any(p => p.PhoneID == phone.PhoneID);
                if (!exists)
                {
                    contact.Phones.Remove(phone);
                    return true;
                }
            }

            // to update or add new phone
            foreach (var phonedto in contactDto.Phones)
            {
                var existingPhone = contact.Phones.FirstOrDefault(p => p.PhoneID == phonedto.PhoneID);

                if (existingPhone is null)
                {
                    var newphone = new Phone
                    {
                        Contact = contact,
                        PhoneNumber = phonedto.PhoneNumber,
                        ContactMethodType = phonedto.ContactMethodType
                    };
                    contact.Phones.Add(newphone);
                }
                else
                {
                    existingPhone.PhoneNumber = phonedto.PhoneNumber;
                    existingPhone.ContactMethodType = phonedto.ContactMethodType;
                }
            }

            return true;

        }

        private bool UpdateSocialMedia(Contact contact, ContactDto contactDto)
        {
            var existingSm = contact.SocialMedias.ToList();
            // deleting phone from existing list
            foreach (var sm in existingSm)
            {
                var exists = contactDto.SocialMedias.Any(p => p.SocialMediaID == sm.SocialMediaID);
                if (!exists)
                {
                    contact.SocialMedias.Remove(sm);
                    return true;
                }
            }

            // to update or add new socialmedia
            foreach (var smdto in contactDto.SocialMedias)
            {
                var existingSM = contact.SocialMedias.FirstOrDefault(p => p.SocialMediaID == smdto.SocialMediaID);

                if (existingSM is null)
                {
                    var newSM = new SocialMedia
                    {
                        Contact = contact,
                        SocialMediaAddress = smdto.SocialMediaAddress,
                        SocialMediaType = smdto.SocialMediaType
                    };
                    contact.SocialMedias.Add(newSM);
                }
                else
                {
                    existingSM.SocialMediaAddress = smdto.SocialMediaAddress;
                    existingSM.SocialMediaType = smdto.SocialMediaType;
                }
            }

            return true;
        }

        public async Task<ContactDto?> CreateContact(ContactDto newContactDto, CancellationToken token)
        {
            if (newContactDto == null)
            {
                return newContactDto;
            }

            var newContact = new Contact
            {
                FirstName = newContactDto.FirstName,
                LastName = newContactDto.LastName,
                MiddleName = newContactDto.MiddleName,
                DateOfBirth = newContactDto.DateOfBirth,
                Title = newContactDto.Title,
                Gender = newContactDto.Gender,
                ContactCategory = newContactDto.ContactCategory
                // age calculation is pending from dob
                //Age
            };

            context.Contacts.Add(newContact);
            await context.SaveChangesAsync(token);

            return newContactDto;

        }

        public async Task<bool> DeleteContactById(int id, CancellationToken token)
        {
            var contact = await context.Contacts.FindAsync(id, token);

            if (contact == null)
            {
                return false;
            }
            contact.IsDeleted = true;
            contact.DeletedOn = DateTime.UtcNow;

            await context.SaveChangesAsync(token);
            return true;

        }


        public async Task<List<Contact>> GetAllContacts(CancellationToken token)
        {
            return await context.Contacts.Where(c => !c.IsDeleted).ToListAsync(token);
        }

        public async Task<Contact?> GetContactById(int id, CancellationToken token)
        {
            return await context.Contacts
                .Where(c => !c.IsDeleted)
                .Include(c => c.Phones)
                .Include(c => c.Emails)
                .Include(c => c.SocialMedias)
                .FirstOrDefaultAsync(c => c.ContactID == id, token);
        }

        public async Task<ContactDto?> UpdateContact(int id, ContactDto contactDto, CancellationToken token)
        {
            var contact = await context.Contacts
                .Include(c => c.Phones)
                .FirstOrDefaultAsync(c => c.ContactID == id, token);

            if (contact == null || contactDto == null)
            {
                return contactDto;
            }

            contact.FirstName = contactDto.FirstName;
            contact.LastName = contactDto.LastName;
            contact.MiddleName = contactDto.MiddleName;
            contact.DateOfBirth = contactDto.DateOfBirth;
            contact.Title = contactDto.Title;
            contact.Gender = contactDto.Gender;
            contact.ContactCategory = contactDto.ContactCategory;

            // add/update/delete phone
            UpdatePhone(contact, contactDto);

            // add/update/delete email
            UpdateEmail(contact, contactDto);

            // add/update/delete social media
            UpdateSocialMedia(contact, contactDto);


            await context.SaveChangesAsync(token);
            return contactDto;
        }
    }
}

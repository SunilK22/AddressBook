using AddressBook.Data;
using AddressBook.DTOs;
using AddressBook.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using System.Reflection.Metadata;



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
                }

            }

            // to update or add new email
            foreach (var emaildto in contactDto.Emails)
            {
                var existingEmail = contact.Emails.FirstOrDefault(p => p.EmailAddressID == emaildto.EmailAddressID);

                if (existingEmail is null)
                {
                    AddEmail(contact, emaildto);
                }
                else
                {
                    existingEmail.EmailAddress = emaildto.EmailAddress;
                    existingEmail.ContactMethodType = emaildto.ContactMethodType;
                }
            }

            return true;
        }

        private bool AddEmail(Contact contact, EmailDto emaildto)
        {
            var newEmail = new Email
            {
                Contact = contact,
                EmailAddress = emaildto.EmailAddress,
                ContactMethodType = emaildto.ContactMethodType
            };
            contact.Emails.Add(newEmail);
            return true;
        }


        private bool UpdatePhone(Contact contact, ContactDto contactDto)
        {

            var existingPhones = contact.Phones.ToList();

            // deleting phone from existing list
            foreach (var phone in existingPhones)
            {
                var exists = contactDto.Phones.Any(p => p.PhoneID == phone.PhoneID );
                if (!exists)
                {
                    contact.Phones.Remove(phone);
                }
            }

            // to update or add new phone
            foreach (var phonedto in contactDto.Phones)
            {
                var existingPhone = contact.Phones.FirstOrDefault(p => p.PhoneID == phonedto.PhoneID);


                if (existingPhone is null)
                {
                    AddPhone(contact, phonedto);

                }
                else
                {
                    existingPhone.PhoneNumber = phonedto.PhoneNumber;
                    existingPhone.ContactMethodType = phonedto.ContactMethodType;
                }
            }

            return true;

        }

        private bool AddPhone(Contact contact, PhoneDto phonedto)
        {
            var newphone = new Phone
            {
                Contact = contact,
                PhoneNumber = phonedto.PhoneNumber,
                ContactMethodType = phonedto.ContactMethodType
            };
            contact.Phones.Add(newphone);

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
                }
            }

            // to update or add new socialmedia
            foreach (var smdto in contactDto.SocialMedias)
            {
                var existingSM = contact.SocialMedias.FirstOrDefault(p => p.SocialMediaID == smdto.SocialMediaID);

                if (existingSM is null)
                {
                    AddSocialMedia(contact, smdto);
                }
                else
                {
                    existingSM.SocialMediaAddress = smdto.SocialMediaAddress;
                    existingSM.SocialMediaType = smdto.SocialMediaType;
                }
            }

            return true;
        }

        private bool AddSocialMedia(Contact contact, SocialMediaDto smdto)
        {
            var newSM = new SocialMedia
            {
                Contact = contact,
                SocialMediaAddress = smdto.SocialMediaAddress,
                SocialMediaType = smdto.SocialMediaType
            };
            contact.SocialMedias.Add(newSM);
            return true;
        }

        public async Task<(ContactDto?, int)> CreateContact(ContactDto newContactDto, CancellationToken token)
        {

            var newContact = new Contact
            {
                FirstName = newContactDto.FirstName,
                LastName = newContactDto.LastName,
                MiddleName = newContactDto.MiddleName,
                DateOfBirth = DateOnly.Parse(newContactDto.DateOfBirth),
                Title = newContactDto.Title,
                Gender = newContactDto.Gender,
                ContactCategory = newContactDto.ContactCategory,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,

            };
            foreach (var phonedto in newContactDto.Phones)
            {
                this.AddPhone(newContact, phonedto);

            }

            foreach (var smdto in newContactDto.SocialMedias)
            {
                this.AddSocialMedia(newContact, smdto);


            }
            foreach (var emailDto in newContactDto.Emails)
            {
                this.AddEmail(newContact, emailDto);

            }


            context.Contacts.Add(newContact);
            await context.SaveChangesAsync(token);

            return (newContactDto, newContact.ContactID);

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
        private ContactDto MapToDto(Contact contact)
        {

            return new ContactDto
            {
                ContactID = contact.ContactID,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                MiddleName = contact.MiddleName,
                DateOfBirth = contact.DateOfBirth.ToString("yyyy-MM-dd"),
                Title = contact.Title,
                Gender = contact.Gender,
                ContactCategory = contact.ContactCategory,

                Emails = contact.Emails.Select(e => new EmailDto
                {
                    EmailAddressID = e.EmailAddressID,
                    EmailAddress = e.EmailAddress,
                    ContactMethodType = e.ContactMethodType

                }).ToList(),

                Phones = contact.Phones.Select(p => new PhoneDto
                {
                    PhoneID = p.PhoneID,
                    PhoneNumber = p.PhoneNumber,
                    ContactMethodType = p.ContactMethodType
                }).ToList(),

                SocialMedias = contact.SocialMedias.Select(s => new SocialMediaDto
                {
                    SocialMediaID = s.SocialMediaID,
                    SocialMediaType = s.SocialMediaType,
                    SocialMediaAddress = s.SocialMediaAddress
                }).ToList()
            };
        }

        public async Task<List<ContactDto>> GetAllContacts(CancellationToken token)
        {
            var allContacts = await context.Contacts
                .Where(c => !c.IsDeleted)
                .Include(c => c.Phones)
                .Include(c => c.Emails)
                .Include(c => c.SocialMedias)
                .ToListAsync(token);

            return allContacts.Select(MapToDto).ToList();
        }

        public async Task<ContactDto?> GetContactById(int id, CancellationToken token)
        {
            var data = await context.Contacts
                .Where(c => !c.IsDeleted)
                .Include(c => c.Phones)
                .Include(c => c.Emails)
                .Include(c => c.SocialMedias)
                .FirstOrDefaultAsync(c => c.ContactID == id, token);

            if (data is null)
                return null;

            return MapToDto(data);
        }

        public async Task<ContactDto?> UpdateContact(int id, ContactDto contactDto, CancellationToken token)
        {
            var query = context.Contacts
                .Where(c => !c.IsDeleted)
                .Include(c => c.Phones)
                .Include(c => c.Emails)
                .Include(c => c.SocialMedias);

            var sql = query.ToQueryString();
            var contact = await query
                .FirstOrDefaultAsync(c => c.ContactID == id, token);

            if (contact == null || contactDto == null)
            {
                return null;
            }

            contact.FirstName = contactDto.FirstName;
            contact.LastName = contactDto.LastName;
            contact.MiddleName = contactDto.MiddleName;
            contact.DateOfBirth = DateOnly.Parse(contactDto.DateOfBirth);
            contact.Title = contactDto.Title;
            contact.Gender = contactDto.Gender;
            contact.ContactCategory = contactDto.ContactCategory;
            contact.UpdatedDate = DateTime.UtcNow;

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

using AddressBook.DTOs;
using AddressBook.Models;

namespace AddressBook.Repository
{
    public interface IContactRepo
    {
        Task<List<Contact>> GetAllContacts(CancellationToken token);

        Task<Contact?> GetContactById(int id, CancellationToken token);

        Task<bool> DeleteContactById(int id, CancellationToken token);

        Task<ContactDto?> CreateContact(ContactDto newContactDto, CancellationToken token);

        Task<ContactDto?> UpdateContact(int id, ContactDto contactDto, CancellationToken token);

    }
}
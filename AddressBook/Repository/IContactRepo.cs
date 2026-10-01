using AddressBook.DTOs;
using AddressBook.Models;

namespace AddressBook.Repository
{
    public interface IContactRepo
    {
        Task<List<ContactDto>> GetAllContacts(CancellationToken token);

        Task<ContactDto?> GetContactById(int id, CancellationToken token);

        Task<bool> DeleteContactById(int id, CancellationToken token);

        Task<(ContactDto?, int)> CreateContact(ContactDto newContactDto, CancellationToken token);

        Task<ContactDto?> UpdateContact(int id, ContactDto contactDto, CancellationToken token);

    }
}
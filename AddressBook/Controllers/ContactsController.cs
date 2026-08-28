using AddressBook.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AddressBook.DTOs;
using AddressBook.Repository;

namespace AddressBook.Controllers
{
    [ApiController]
    [Route("contacts")]
    public class ContactsController : ControllerBase
    {
        private AddressBookContext context;
        private IContactRepo contactRepo;

        public ContactsController(AddressBookContext context)
        {
            this.context = context;
            contactRepo = new ContactRepo(context);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts(CancellationToken cToken)
        {
            var contacts = await contactRepo.GetAllContacts(cToken);
            return Ok(contacts);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id, CancellationToken cToken)
        {

            var contact = await contactRepo.GetContactById(id, cToken);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id, CancellationToken cToken)
        {

            var isContactDeleted = await contactRepo.DeleteContactById(id, cToken);

            if (!isContactDeleted)
            {
                return NotFound(new { message = $"Contact with id {id} not found." });

            }
            return Ok(new
            {
                success = true,
                message = $"Contact with id {id} is successfully deleted."
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactDto newContactDto, CancellationToken cToken)
        {

            var newContact = await contactRepo.CreateContact(newContactDto, cToken);

            if (newContact == null)
            {
                return BadRequest("Invalid contact details provided.");
            }
            return CreatedAtAction(
                    nameof(GetContact),
                    //new { id = newContact.ContactID },
                    new { success = true, message = "Contact successfully created.", data = newContact }
                );

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] ContactDto contactDto, CancellationToken cToken)
        {
            var contact = await context.Contacts
                .Include(c => c.Phones)
                .FirstOrDefaultAsync(c => c.ContactID == id, cToken);

            if (contact == null || contactDto == null)
            {
                return NotFound();
            }

            await contactRepo.UpdateContact(id, contactDto, cToken);

            return Ok(contactDto);
        }
    }
}


using AddressBook.DTOs;
using AddressBook.Repository;
using Microsoft.AspNetCore.Mvc;


namespace AddressBook.Controllers
{
    [ApiController]
    [Route("contacts")]
    public class ContactsController : ControllerBase
    {
        private IContactRepo contactRepo;

        public ContactsController(IContactRepo contactRepo)
        {
            this.contactRepo = contactRepo;
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
            if (newContactDto == null)
            {
                return BadRequest("Invalid contact details provided.");
            }

            var (newContact, contactId) = await contactRepo.CreateContact(newContactDto, cToken);

            return CreatedAtAction(
                    nameof(GetContact),
                    new { id = contactId },
                    new { success = true, message = "Contact successfully created.", data = newContact }
                );

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] ContactDto contactDto, CancellationToken cToken)
        {

            var updated = await contactRepo.UpdateContact(id, contactDto, cToken);
            if (updated is null)
            {
                return NotFound();
            }

            return Ok(updated);
        }
    }
}


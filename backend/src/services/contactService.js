import {
  createContact,
  findContactsByUserId,
  findContact,
} from "../repositories/contactRepository.js";

export const addContact = async (
  userId,
  contactId
) => {
  if (userId === contactId) {
    throw new Error("You cannot add yourself");
  }

  const existingContact =
    await findContact(
        userId,
        contactId
    );

    if (existingContact) {
    throw new Error(
        "Contact already exists"
    );
    }

  const contact = await createContact(
    userId,
    contactId
  );

  return {
    id: contact._id,
    userId: contact.userId.toString(),
    contactId: contact.contactId.toString(),
  };
};

export const getContacts = async (
  userId
) => {
  const contacts = await findContactsByUserId(
    userId
  );

  return contacts.map((contact) => ({
    id: contact._id,
    userId: contact.userId.toString(),
    contactId: contact.contactId.toString(),
  }));
};
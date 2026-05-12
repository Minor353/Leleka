import {
  addContact,
  getContacts,
} from "../services/contactService.js";

export const createContactController =
  async (req, res) => {
    try {
      const { contactId } = req.body;

      const contact =
        await addContact(
          req.user.userId,
          contactId
        );

      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

export const getContactsController =
  async (req, res) => {
    try {
      const contacts =
        await getContacts(
          req.user.userId
        );

      res.json(contacts);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
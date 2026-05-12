import { Contact } from "../models/ContactModel.js";

export const createContact = async (
  userId,
  contactId
) => {
  return await Contact.create({
    userId,
    contactId,
  });
};

export const findContactsByUserId =
  async (userId) => {
    return await Contact.find({ userId });
  };

export const findContact = async (
  userId,
  contactId
) => {
  return await Contact.findOne({
    userId,
    contactId,
  });
};
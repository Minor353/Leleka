import { User } from "../models/UserModel.js";

export const findAllUsers = async () => {
  return await User.find();
};
import {User} from "../models/UserModel.js";

export const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

export const findUserById = async (id) => {
    return await User.findById(id);
};
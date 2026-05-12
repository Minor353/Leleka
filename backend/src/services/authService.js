import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    findUserByUsername,
    findUserById,
} from "../repositories/authRepository.js";

export const loginUser = async (username, password) => {
    const user = await findUserByUsername(username);

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            displayName: user.displayName,
        },
    };
};

export const getCurrentUser = async (
    userId
) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
    };
};
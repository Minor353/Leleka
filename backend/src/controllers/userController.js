import { getUsers } from "../services/userService.js";

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await getUsers(
      req.user.userId
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
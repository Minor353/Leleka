import { findAllUsers } from "../repositories/userRepository.js";

export const getUsers = async (
  currentUserId
) => {
  const users = await findAllUsers();

  return users
    .filter(
      (user) =>
        user._id.toString() !== currentUserId
    )
    .map((user) => ({
      id: user._id,
      username: user.username,
      displayName: user.displayName,
    }));
};
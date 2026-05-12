import bcrypt from 'bcrypt';

import { User } from '../models/UserModel.js';

export async function seedUsers() {
  const users = [
    {
      username: 'minor',
      password: '123456',
      displayName: 'Мінор',
    },
    {
      username: 'hawk',
      password: '123456',
      displayName: 'Hawk',
    },
    {
      username: 'ghost',
      password: '123456',
      displayName: 'Ghost',
    },
    {
      username: 'fisher',
      password: '123456',
      displayName: 'Рибак',
    },
  ];

  for (const userData of users) {
    const existingUser =
      await User.findOne({
        username: userData.username,
      });

    if (existingUser) {
      continue;
    }

    const hashedPassword =
      await bcrypt.hash(
        userData.password,
        10
      );

    await User.create({
      username: userData.username,
      password: hashedPassword,
      displayName: userData.displayName,
    });
  }

  console.log('Users seeded');
}
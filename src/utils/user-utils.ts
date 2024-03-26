import { User } from '../types/user-types';

export function removeUser(users: User[], id: number): User | null {
  users.sort((_, user) => {
    if (user.id == id) return -1;
    else return 0;
  });
  const deletedUser = users.pop();
  return deletedUser ?? null;
}

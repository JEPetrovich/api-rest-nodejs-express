export interface User {
  id: number;
  name: string;
  email: string;
  create_date: string;
}

export type NewUser = Omit<User, 'id' | 'create_date'>;

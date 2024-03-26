import usersData from '../data/users-data.json';
import { User, NewUser } from '../types/user-types';
import { checkValue, formattedDate, notEmptyString } from '../utils/app-utils';
import { removeUser } from '../utils/user-utils';

const users: User[] = usersData as User[];

export const getUsers = (): User[] => users;

export const getNewUser = (body: any): NewUser => {
  let name = checkValue({
    value: body.name,
    name: 'name',
    type: 'string',
    required: true,
    isDateString: false,
  });

  let email = checkValue({
    value: body.email,
    name: 'email',
    type: 'string',
    required: true,
    isDateString: false,
  });

  const newUser: NewUser = {
    name,
    email,
  };

  return newUser;
};

export const addUser = (newUser: NewUser) => {
  let id = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  let create_date = formattedDate();

  const newUserEntry: User = {
    id,
    ...newUser,
    create_date,
  };

  users.push(newUserEntry);
  return newUserEntry;
};

export const getEditUser = (body: any): User => {
  let id = checkValue({
    value: body.id,
    name: 'id',
    type: 'number',
    required: true,
    isDateString: false,
  });

  let name = checkValue({
    value: body.name,
    name: 'name',
    type: 'string',
    required: false,
    isDateString: false,
  });

  let email = checkValue({
    value: body.email,
    name: 'email',
    type: 'string',
    required: false,
    isDateString: false,
  });

  let create_date = checkValue({
    value: body.create_date,
    name: 'create_date',
    type: 'string',
    required: false,
    isDateString: true,
  });

  const editUser: User = {
    id,
    name,
    email,
    create_date,
  };

  return editUser;
};

export const updateUser = (editUser: User): User => {
  const index = users.findIndex((user) => user.id == editUser.id);
  if (index < 0) throw new Error('User not found.');
  const { id } = editUser;
  const oldUser = { ...users[index] };
  const newEditedUser = {
    id,
    name: notEmptyString(editUser.name) ? editUser.name : oldUser.name,
    email: notEmptyString(editUser.email) ? editUser.email : oldUser.email,
    create_date: notEmptyString(editUser.create_date)
      ? editUser.create_date
      : oldUser.create_date,
  };
  users[index] = newEditedUser;
  return newEditedUser;
};

export const deleteUser = (id: number): User => {
  let userNotFound = !users.some((user) => user.id == id);
  if (userNotFound) throw new Error('User not found.');
  const deletedUser = removeUser(users, id);
  if (!deletedUser) throw new Error('There are no users to remove.');
  return deletedUser;
};

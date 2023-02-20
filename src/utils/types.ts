export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
};

export type UserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

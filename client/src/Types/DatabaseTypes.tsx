export interface User {
  handle?: string;
  createdAt?: string;
  role?: UserRole;
  bio?: string;
}

export enum UserRole {
  user,
  admin,
}

import { IUser } from "../models/User";

export interface updateUser {
  email?: string;
  isActive?: boolean;
}

export interface UserRepository {
  createUser(email: string): Promise<IUser>;

  getByIdUser(id: string): Promise<IUser>;
  getAllUser(): Promise<IUser[]>;
  updateUser(id: string, body: updateUser): Promise<IUser>;
  deleteUser(id: string): Promise<IUser>;
}

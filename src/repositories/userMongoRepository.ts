import User, { IUser } from "../models/User";
import { updateUser, UserRepository } from "./userRepository";

export class UserMongoRepository implements UserRepository {
  async createUser(email: string): Promise<IUser> {
    return await User.create({ email });
  }

  async getAllUser(): Promise<IUser[]> {
    return await User.find();
  }

  async getByIdUser(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateUser(id: string, body: updateUser): Promise<IUser> {
    const { email, isActive } = body;

    User.findByIdAndUpdate(
      id,
      { email, isActive },
      { new: true }
    ) as Promise<IUser>;

    return User.findById(id) as Promise<IUser>;
  }

  async deleteUser(id: string): Promise<IUser> {
    return User.findByIdAndDelete(id) as Promise<IUser>;
  }
}

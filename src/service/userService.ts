import { updateUser, UserRepository } from "./../repositories/userRepository";
import User, { IUser } from "../models/User";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  // static async createUser(email: string) {
  //   if (email.includes("@")) {
  //     throw new Error("Email already exists");
  //   }

  //   const user = new User({ email });
  //   const newUser = await user.save();
  //   return newUser;
  // }

  async createUser(email: string) {
    if (!email.includes("@")) {
      throw new Error("Email already exists");
    }

    const isExits = await User.findOne({ email });
    if (isExits) {
      throw new Error("Email already exists");
    }

    return this.userRepository.createUser(email);
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUser();
    return users;
  }

  async getByIdUser(id: string) {
    return await this.userRepository.getByIdUser(id);
  }

  async updateUser(id: string, body: updateUser): Promise<IUser> {
    const { email, isActive } = body;
    const IsExits = await User.findById(id);
    if (!IsExits) {
      throw new Error("User not found");
    }
    return this.updateUser(id, body);
  }

  async deleteUser(id: string) {
    const deletedUser = await User.findById(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  }
}

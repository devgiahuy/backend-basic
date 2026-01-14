import User from "../models/User";

export class UserService {
  static async createUser(email: string) {
    // Business rule
    const existed = await User.findOne({ email });
    if (existed) {
      throw new Error("User already exists");
    }
    const user = new User({ email });
    const newUser = await user.save();
    return newUser;
  }

  static async getAllTasks() {
    const user = await User.find().sort({ createUser: "desc" }); // sắp xếp giảm dần theo createAt

    return user;
  }
}

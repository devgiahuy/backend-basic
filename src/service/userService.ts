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

  static async getAllUsers() {
    const user = await User.find().sort({ createUser: "desc" }); // sắp xếp giảm dần theo createAt

    return user;
  }

  static async getByIdUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log("ID:", id);
    console.log("User:", user);

    return user;
  }

  static async updateUser(id: string, body: any) {
    const { email, isActive } = body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, isActive },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }
}

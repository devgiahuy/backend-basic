import { UserService } from "./../service/userService";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  // static async create(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { email } = req.body;

  //     if (!email) {
  //       return res.status(400).json({ message: "Email is required" });
  //     }

  //     const user = await userService.createUser(email);

  //     return res.status(201).json(user);
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await this.userService.createUser(email);

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await this.userService.getAllUsers();
      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;

      const user = await this.userService.getByIdUser(id);
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { email, isActive } = req.body;
      const updatedUser = await this.userService.updateUser(id, {
        email,
        isActive,
      });
      return res.status(201).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;

      const deleteUser = await this.userService.deleteUser(id);

      if (!deleteUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}

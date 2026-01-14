import { Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await UserService.createUser(email);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const user = await UserService.getAllUsers();
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const user = await UserService.getByIdUser(id);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      // const { emai, isActive } = req.body;
      const updatedUser = await UserService.updateUser(id, req.body);
      return res.status(201).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

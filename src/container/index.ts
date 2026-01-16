import { UserController } from "./../controllers/userController";
import { UserMongoRepository } from "../repositories/userMongoRepository";
import { UserService } from "../service/userService";

const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
export { userController };

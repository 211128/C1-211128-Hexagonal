import { RegisterUseCase } from "../../application/registerUseCase";
import { UserMysqlRepository } from "../userMysqlRepository";
import { RegisterController } from "./registerController";
import { ListAllUserController } from "./listAllUsersController";
import { ListAllUserUseCase } from "../../application/listAllUserUseCase";

export const userMysqlRepository = new UserMysqlRepository();
export const registerUseCase = new RegisterUseCase(userMysqlRepository);
export const registerController = new RegisterController(registerUseCase);


export const listAllUseCase = new ListAllUserUseCase(userMysqlRepository)
export const listAllUserController = new ListAllUserController(listAllUseCase)
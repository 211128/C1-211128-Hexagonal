import { User } from "./user";

export interface IUserRepository {
  registerUser(
    name: string,
    email: string,
    phone: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    active: boolean
  ): Promise<User | null>;
  listAllUsers():Promise<User[] | null>
}

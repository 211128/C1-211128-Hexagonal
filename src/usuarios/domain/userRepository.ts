import { User } from "./user";

export interface IUserRepository {
  registerUser(
    name: string,
    email: string,
    phone: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    active: boolean,
    canlent: boolean
  ): Promise<User | null>;

  listAllUsers(): Promise<User[] | null>;

  deleteUserById(id: string): Promise<string | null>;

  getUserById(id: string): Promise<User | null>;

  listAllInactiveUser(): Promise<User[] | User | null>;

  updatePassword(id: number, password: string, cpassword: string): Promise<User | null> 

  setAsInactive(id: number): Promise<number | null>;
  


  updateUsers(
    id: number,
    name?: string,
    phone?: string,
    email?: string,
): Promise<User | null>

filterUser( 
        filter: string,
        email?: string,
        name?: string,
        phone?: string
    ): Promise<User | User[] | null>


}
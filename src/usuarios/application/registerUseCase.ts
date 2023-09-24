import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class RegisterUseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async run(
    name: string,
    email: string,
    phone: string,
    password: string, // Debe almacenarse de forma segura (hash + salt)
    active: boolean
  ): Promise<User | null> {
    try {
      const createNewUser = await this.userRepository.registerUser(
        name,
        email,
        phone,
        password,
        active
      );


      return createNewUser;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return null; 
    }
  }
}

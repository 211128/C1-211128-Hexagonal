import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";


export class UpdateUserUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    async run(
        id: number,
        name?: string,
        phone?: string,
        email?: string,
        ): Promise<User | null> {
        console.log("updated")
        try {
            const updateUserById = await this.userRepository.updateUsers(id,name,phone,email);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}
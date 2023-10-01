import { IUserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class FilterUserUseCase {
    constructor(readonly userRepository: IUserRepository) {}
    
    async run(filter: string, email?: string, name?: string, phone?: string): Promise<User | User[] | null> {
        console.log(filter)
        try {
            const listUsers = await this.userRepository.filterUser(filter, email, name, phone);
            
            if (listUsers) {
                return listUsers;
            } else {
                // Puedes lanzar una excepción personalizada en lugar de retornar null si lo prefieres.
                throw new Error("No se encontraron usuarios que coincidan con los criterios de búsqueda.");
            }
        } catch (error) {
            // Puedes realizar un manejo específico de la excepción aquí si es necesario. 
            console.error("Error al obtener usuarios por filtro:", error);
            return null;
        }
    }
}

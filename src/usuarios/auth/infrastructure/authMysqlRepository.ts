import { AuthRepository } from "../domain/authRepository";

export class AuthMysqlRepository implements AuthRepository  {
    login(email: string, password: string): Promise<any> {
       // implementar logica para login
    }
    logout(logoutStatus: boolean): Promise<boolean> {
        return Boolean
}
}
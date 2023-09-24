import { query } from "../../database/conecction";
import { User } from "../domain/user";
import { IUserRepository } from "../domain/userRepository";

export class UserMysqlRepository implements IUserRepository {
  async registerUser(name: string, email: string, phone: string, password: string, active: boolean): Promise<User | null> {
    try {
      const sql = "INSERT INTO users (Name, Email, Phone, Password, Active) VALUES (?, ?, ?, ?, ?)";
      const params: any[] = [name, email, phone, password, active];
      const [result]: any = await query(sql, params);
      if (result.insertId) {
        // Crear una instancia de User con el ID generado
        const user = new User(result.insertId, name, email, phone, password, active);
        return user;
      } else {
        console.error("No se pudo insertar el usuario en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return null;
    }
  }

  async listAllUsers(): Promise<User[] | null> {
    try {
      const sql = "SELECT * FROM Users"; // Cambiado a "Users" con mayúscula según la tabla de la base de datos
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const users: User[] = rows.map((row: any) => {
        return new User(
          row.ID,      // Cambiado a "ID" con mayúscula según la columna de la base de datos
          row.Name,    // Cambiado a "Name" con mayúscula según la columna de la base de datos
          row.Email,   // Cambiado a "Email" con mayúscula según la columna de la base de datos
          row.Phone,   // Cambiado a "Phone" con mayúscula según la columna de la base de datos
          row.Password,// Cambiado a "Password" con mayúscula según la columna de la base de datos
          row.Active   // Cambiado a "Active" con mayúscula según la columna de la base de datos
        );
      });

      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
  }
}

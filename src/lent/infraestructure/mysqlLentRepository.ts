import { query } from "../../database/conecction";
import { Lent } from "../domain/lent";
import { ILentRepository } from "../domain/lentRepository";


export class MysqlLentRepository implements ILentRepository {


    async userCanLentBook(id_book: number, id_user: number,status: boolean): Promise<Lent | Error> {

        try {
            // 1. Verificar el status del usuario o del libro
            const checkLentStatusSql = `
            SELECT 
                (SELECT canLent FROM users WHERE id = ?) AS user_lent_status, 
                (SELECT canLent FROM books WHERE id = ?) AS book_lent_status;
            `;
            const [results]: any = await query(checkLentStatusSql, [id_user, id_book]);
            console.log(results)
            const { user_lent_status, book_lent_status } = results[0];
            console.log(user_lent_status, book_lent_status)
            // Si alguno de los canLent es TRUE, no se puede proceder con el préstamo.
            if (user_lent_status && book_lent_status) {
                throw new Error("Both the user and the book are not available for lent.");
            }
            if (user_lent_status) {
                throw new Error("The user is not available for lent.");
            }
            if (book_lent_status) {
                throw new Error("The book is not available for lent.");
            }

            // 2. Actualizar canLent en users y books a TRUE
            const updateUserLentStatusSql = `
                UPDATE users SET canLent = TRUE WHERE id = ?;
            `;
            await query(updateUserLentStatusSql, [id_user]);

            const updateBookLoanStatusSql = `
                UPDATE books SET canLent = TRUE WHERE id = ?;
            `;
            await query(updateBookLoanStatusSql, [id_book]);

            // 3. Insertar el nuevo préstamo en la tabla lents
            const insertLentSql = `
                INSERT INTO lents (id_book, id_user, status) 
                VALUES (?, ?, ?);
            `;
            await query(insertLentSql, [id_book, id_user, status]);

            // Crear y retornar un objeto Loan
            const newLent: Lent = new Lent(results.insertId, id_book, id_user, status);
            return newLent;

        } catch (error) {
            console.error("Error al prestar libro:", error);
            if (error instanceof Error) {
                return error;
            }
            return new Error("An unexpected error occurred.");
        }
    }


    async returnLent(id: number): Promise<number | string |  Error> {
        try {
            // 1. Obtener el id_user y id_book asociados con el préstamo
            const getLentDetailsSql = `
                SELECT id_user, id_book FROM lents WHERE id = ?;
            `;
            const [lentDetails]: any = await query(getLentDetailsSql, [id]);

            if (!lentDetails || lentDetails.length === 0) {
                throw new Error("Préstamo no encontrado.");
            }

            const { id_user, id_book } = lentDetails[0];

            // 2. Actualizar canLent en users y books a FALSE
            const updateUserLentStatusSql = `
                UPDATE users SET canLent = FALSE WHERE id = ?;
            `;
            await query(updateUserLentStatusSql, [id_user]);

            const updateBookLentStatusSql = `
                UPDATE books SET canLent = FALSE WHERE id = ?;
            `;
            await query(updateBookLentStatusSql, [id_book]);

            // 3. Actualizar el status del préstamo en la tabla loans a FALSE
            const updateLentStatusSql = `
                UPDATE lents SET status = FALSE WHERE id = ?;
            `;
            await query(updateLentStatusSql, [id]);

            // Retornar un mensaje indicando que el proceso fue exitoso
            return "Préstamo devuelto con éxito.";

        } catch (error) {
            console.error("Error al devolver el libro:", error);
            if (error instanceof Error) {
                return error.message;
            }
            return "Ocurrió un error inesperado al devolver el libro.";
        }
    }

    async getAllLents(): Promise<Lent[] | Error> {
        try {
            // 1. Consulta SQL para obtener todos los préstamos
           
            const sql = "SELECT * FROM lents;";
            const [rows]: any = await query(sql); // Esto probablemente devuelve un tipo de dato más complejo
           
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array'); // o maneja este caso como prefieras
            }

            // 2. Convertir los resultados en una lista de objetos Loan
            const lents: Lent[] = rows.map((row => new Lent(row.id, row.id_book, row.id_user, row.status)));
                console.log(lents[0])
            return lents;

        } catch (error) {
            console.error("Error al obtener todos los préstamos:", error);
            return new Error("Ocurrió un error al obtener todos los préstamos.");
        }
    }
}
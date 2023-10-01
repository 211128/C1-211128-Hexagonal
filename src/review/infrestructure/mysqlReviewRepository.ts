import { query } from "../../database/conecction"
import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";
import { validateReviewConditions, validateReviewExist, validateUserExist } from "./validation/validationReviewsMysql";

export class MysqlReviewRepository implements IreviewRepository {


    async addReviewByUser(id_user: number, id_book: number, content: string, status: boolean): Promise<Reviews | null | Error | string | number> {
    
        try {
            await validateReviewConditions(id_user, id_book);
    
            // Paso 3: Agregar reseña después de haber pasado las condiciones
            const sql = `
                INSERT INTO Reviews (id_book, id_user, content, status)
                VALUES (?, ?, ?, ?);
            `;
            const values: any[] = [id_book, id_user, content, status];
            const result: any = await query(sql, values);
    
            if (result.affectedRows === 1) {
                // Se insertó una nueva reseña correctamente
                const newReviewId: number = result.insertId;
                const newReview: Reviews = new Reviews(newReviewId, id_user, id_book, content, status);
                console.log(newReview);
                return newReview;
            } else {
                // No se insertó la reseña, probablemente debido a un error
                throw new Error("No se pudo insertar la reseña.");
            }
        } catch (error) {
            console.error("Error adding review:", error);
            return (error as Error).message;
        }
    }

    async listReviewsByUser(id: number): Promise<Reviews[] | number> {
        try {
            await validateUserExist(id);
    
            // 1. Consulta SQL para obtener todas las reviews de un usuario específico
            const sql = "SELECT * FROM reviews WHERE id_user = ?;";
            const [rows]: any = await query(sql, [id]);
    
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array');
            }
    
            // 2. Convertir los resultados en una lista de objetos Review
            const reviews: Reviews[] = rows.map(row => new Reviews(
                row.id,
                row.id_user,
                row.id_book,
                row.content,
                row.status
            ));
    
            return reviews;
    
        } catch (error) {
            console.error("Error al obtener las reviews del usuario:", error);
            return -1; // Puedes retornar -1 u otro valor que indique un problema
        }
    }
    
    
    

    async listAllReview(): Promise<Reviews[] | null> {
        try {
            // 1. Consulta SQL para obtener todas las reviews
            const sql = "SELECT * FROM reviews;";
            const [rows]: any = await query(sql); 
    
            if (!Array.isArray(rows)) {
                throw new Error('Rows is not an array');
            }
    
            // 2. Convertir los resultados en una lista de objetos Review
            const reviews: Reviews[] = rows.map(row => new Reviews(
                row.id,
                row.id_user,
                row.id_book,
                row.content,
                row.status
            ));
    
            return reviews;
    
        } catch (error) {
            console.error("Error al obtener todas las reviews:", error);
            return null;
        }
    }

    async getReviewById(id: number): Promise<Reviews | number | null> {
        try {
            await validateUserExist(id);
    
            // Consulta SQL para obtener una sola reseña por ID
            const sql = "SELECT * FROM reviews WHERE id = ? LIMIT 1;";
            const [row]: any = await query(sql, [id]);
    
            if (!row) {
                return null; // No se encontró ninguna reseña con ese ID
            }
    
            // Convertir el resultado en un objeto Review
            const review: Reviews = new Reviews(
                row.id,
                row.id_user,
                row.id_book,
                row.content,
                row.status
            );
    
            return review;
    
        } catch (error) {
            console.error("Error getting review:", error);
            return -1;
        }
    }
    
    
    async getReviewsById(id: number): Promise<Reviews | null | number | string> {
        try {
            await validateReviewExist(id)


            // 1. Consulta SQL para obtener la review con el UUID específico
            const sql = "SELECT * FROM reviews WHERE id = ?;";
            const [rows]: any = await query(sql, [id]);
    
            // Verificar si obtuvimos un resultado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null; // Puedes retornar null si no se encuentra la review con ese UUID.
            }
    
            // Tomar la primera fila como resultado (debido a que UUID es único, solo deberíamos tener un resultado)
            const row = rows[0];
    
            // 2. Convertir el resultado en un objeto Review
            const review: Reviews = new Reviews(
                row.id,
                row.id_user,
                row.id_book,
                row.content,
                row.status
            );
    
            return review;
    
        } catch (error) {
            console.error("Error adding review:", error);
            return (error as Error).message;
        }
    }
    
    async listInactiveReviews(): Promise<Reviews[] | null> {
        try {
            // Consulta SQL para obtener todas las reviews con status = FALSE
            const sql = "SELECT * FROM reviews WHERE status = 0;";
            const [rows]: any = await query(sql);
            
            // Si no hay resultados o no es un array, se retorna null
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }
    
            // Convertir los resultados en una lista de objetos Review
            const reviews: Reviews[] = rows.map(row => new Reviews(
                row.id,
                row.id_user,
                row.id_book,
                row.content, 
                row.status));
            return reviews;
    
        } catch (error) {
            console.error("Error al obtener las reviews inactivas:", error);
            return null;
        }
    }
    
    async deleteReviewById(id_control: number, id_user: number): Promise<number | Error > {
        try {
            await validateReviewExist(id_control);
            await validateUserExist(id_user);
    
            // Paso 1: Verificar que el usuario es el propietario de la review
            const validationSql = "SELECT id_user FROM reviews WHERE id = ?;";
            const [validationResults]: any = await query(validationSql, [id_control]);
            
            if (validationResults.length === 0) {
                throw new Error("No se encontró la review con el ID proporcionado.");
            }
    
            if (validationResults[0].id_user !== id_user) {
                throw new Error("No tienes permiso para eliminar esta review.");
            }
    
            // Paso 2: Eliminar la review
            const sql = "DELETE FROM reviews WHERE id = ?;";
            const result: any = await query(sql, [id_control]);
    
            // Verificamos si se eliminó alguna fila
            if (result.affectedRows === 0) {
                throw new Error("No se encontró la review con el UUID proporcionado.");
            }
    
            return 1; // Devuelve 1 para indicar éxito
    
        } catch (error) {
            console.error("Error deleting review:", error);
            return -1
        }
    }
    

    async updateReviewById(id_control: number, id_user: number, content: string): Promise<Reviews | Error | string> {
        try {
            await validateReviewExist(id_control)
            await validateUserExist(id_user)
            // 1. Comprobar si la revisión pertenece al usuario
            const checkOwnershipSql = `
                SELECT COUNT(*) as count
                FROM reviews
                WHERE id = ? AND id_user = ?;
            `;
            const [ownershipResults]: any = await query(checkOwnershipSql, [id_control, id_user]);
            if (ownershipResults[0].count === 0) {
                throw new Error("El usuario no tiene permiso para modificar esta revisión.");
            }
    
            // 2. Actualizar la revisión
            const updateSql = `
                UPDATE reviews 
                SET review = ? 
                WHERE id = ?;
            `;
            await query(updateSql, [content, id_control]);
    
            // 3. Obtener la revisión actualizada para devolverla
            const getUpdatedReviewSql = `
                SELECT * 
                FROM reviews
                WHERE id = ?;
            `;
            const [updatedReviewResults]: any = await query(getUpdatedReviewSql, [id_control]);
    
            // Convertir el resultado en un objeto Review y devolverlo
            const updatedReview: Reviews = new Reviews(
                updatedReviewResults[0].id,
                updatedReviewResults[0].id_user,
                updatedReviewResults[0].id_book,
                updatedReviewResults[0].content,
                updatedReviewResults[0].status
            );
    
            return updatedReview;
    
        } catch (error) {
            console.error("Error adding review:", error);
            return (error as Error).message;
        }
    }
    
    
    

}
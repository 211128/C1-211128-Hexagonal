import { query } from "../../database/conecction";
import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";


export class MysqlBookRepository implements IBookRepository {


    async addNewBook(
        title: string,
        author: string,
        description: string,
        unique_code: string,
        img_url: string,
        canLent: boolean,
        status: boolean
      ): Promise<Book | null> {
        try {
          const sql = `
            INSERT INTO books (title, author, description, unique_code, img_url, canLent, status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
          `;
          const params = [title, author, description, unique_code, img_url, canLent, status];
          const [result]: any = await query(sql, params);
      
          const newBook: Book = new Book(
            result.insertId, // La ID se generará automáticamente por la base de datos
            title,
            author,
            description,
            unique_code,
            img_url,
            canLent,
            status
          );
          return newBook;
        } catch (error) {
          console.error("Algo salió mal al agregar el libro:", error);
          return null;
        }
      }
      


    async listAllBooks(): Promise<Book[] | null> {
        try {
            const sql = "SELECT * FROM books"; // Asumiendo que tu tabla se llama 'books'
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.id,
                    row.title,
                    row.author,
                    row.description,
                    row.unique_code,
                    row.img_url,
                    row.canLent,
                    row.status
                );
            });

            return books;

        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
    }

    async listAllInactiveBooks(): Promise<Book[] | null> {
        try {
            // Filtra los libros donde canLent es false
            const sql = "SELECT * FROM books WHERE status = false";
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.id,
                    row.title,
                    row.author,
                    row.description,
                    row.unique_code,
                    row.img_url,
                    row.canLent,
                    row.status
                );
            });

            return books;

        } catch (error) {
            console.error('Error al obtener libros inactivos:', error);
            return null;
        }
    }

    async updateBookById(id: number, description?: string): Promise<Book | null> {
        try {
            // Verificar si el libro con el id proporcionado existe
            const checkSql = "SELECT * FROM books WHERE id = ?";
            const [existingBooks]: any = await query(checkSql, [id]);

            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                return null;  // Libro no encontrado
            }

            // Construir la consulta SQL de actualización dinámicamente
            const updates: string[] = [];
            const values: any[] = [];

            if (description !== undefined) {
                updates.push("description = ?");
                values.push(description);
            }

            // Si no hay nada para actualizar, regresar el libro existente
            if (updates.length === 0) {
                return new Book(
                    existingBooks[0].id,
                    existingBooks[0].title,
                    existingBooks[0].author,
                    existingBooks[0].description,
                    existingBooks[0].unique_code,
                    existingBooks[0].img_url,
                    existingBooks[0].canLent,
                    existingBooks[0].status
                );
            }

            const sql = `UPDATE books SET ${updates.join(", ")} WHERE id = ?`;
            values.push(id);

            await query(sql, values);

            // Devolver el libro actualizado
            const [updatedBooks]: any = await query(checkSql, [id]);

            return new Book(
                updatedBooks[0].id,
                updatedBooks[0].title,
                updatedBooks[0].author,
                updatedBooks[0].description,
                updatedBooks[0].unique_code,
                updatedBooks[0].img_url,
                updatedBooks[0].canLent,
                updatedBooks[0].status
            );

        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            return null;
        }
    }

    async deleteBookById(id: number): Promise<number | null> {
        try {
            // Primero, verifiquemos si el libro con el id proporcionado existe
            const checkSql = "SELECT * FROM books WHERE id = ?";
            const [existingBooks]: any = await query(checkSql, [id]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(existingBooks) || existingBooks.length === 0) {
                return null;
            }

            // Si el libro existe, procedemos a eliminarlo
            const sql = "DELETE FROM books WHERE id = ?";
            await query(sql, [id]);

            // Si la eliminación fue exitosa, regresamos un mensaje de éxito
            return null;

        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            return null;
        }
    }


    async getBookById(id: number): Promise<Book | null> {
        try {
            const sql = "SELECT * FROM books WHERE id = ?";
            const [rows]: any = await query(sql, [id]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const row = rows[0]; 

            const book = new Book(
                row.id,
                row.title,
                row.author,
                row.description,
                row.unique_code,
                row.img_url,
                row.canLent,
                row.status
            );

            return book;

        } catch (error) {
            console.error('Error al obtener el libro:', error);
            return null;
        }
    }

    async activetedBook(id: number): Promise<number | null> {
        try {
            const sql = "UPDATE books SET loan_status = true WHERE id = ?";
            const result: any = await query(sql, [id]);

            if (result.affectedRows > 0) {

                return null;
            } else {
                return null; // Esto indica que ningún libro con ese UUID fue encontrado.
            }
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            return null;
        }
    }


    async FilterById(
        filter: string,
        title?: string | undefined,
        author?: string | undefined): Promise<Book[] | null> {
        try {
            let sql: string;
            let value: string | undefined;

            switch (filter) {
                case 'title':
                    if (!title) throw new Error('Title is required when filter is title');
                    sql = 'SELECT * FROM books WHERE title = ?';
                    value = title;
                    break;
                case 'author':
                    if (!author) throw new Error('Author is required when filter is author');
                    sql = 'SELECT * FROM books WHERE author = ?';
                    value = author;
                    break;
                default:
                    throw new Error('Invalid filter type');
            }

            const [rows]: any = await query(sql, [value]);
            if (!rows || rows.length === 0) return null;
            return rows.map((row: Book) => new Book(row.id,
                row.title,
                row.author,
                row.description,
                row.unique_code,
                row.img_url,
                row.canLent,
                row.status));

        } catch (error) {
            console.error(error);
            return null;
        }
    }



    async listWithReviews(): Promise<Book[] | null> {
        try {
            const sql = `
            SELECT DISTINCT
            b.*
            FROM books b
            JOIN reviews r ON b.id = r.book_id;
        
                `;
            const [rows]: any = await query(sql);

            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const books: Book[] = rows.map(row => {
                return new Book(
                    row.id,
                    row.title,
                    row.author,
                    row.description,
                    row.unique_code,
                    row.img_url,
                    row.canLent,
                    row.status
                );
            });

            return books;

        } catch (error) {
            console.error('Error al obtener los libros con reseñas:', error);
            return null;
        }
    }





}


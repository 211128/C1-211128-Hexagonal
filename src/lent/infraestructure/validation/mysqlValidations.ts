import { query } from "../../../database/conecction";


export async function verifyExistence( id_book: number, id_user: number): Promise<void> {
    const statusUserSql = `
        SELECT canLent FROM users WHERE id = ?;
    `;
    const [userExist]: any = await query(statusUserSql, [id_user]);

    if (userExist.length === 0) {
        throw new Error("The provided user ID does not match any records.");
    }

    const statusBookSql = `
        SELECT canLent FROM books WHERE id = ?;
    `;
    const [bookExist]: any = await query(statusBookSql, [id_book]);

    if (bookExist.length === 0) {
        throw new Error("The provided book ID does not match any records.");
    }
}

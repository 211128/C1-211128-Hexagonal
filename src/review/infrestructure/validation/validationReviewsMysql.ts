import { query } from "../../../database/conecction";


export async function validateReviewConditions(id_user: number, id_book: number) {
    // Verifica si el id_user existe
    const checkIfUserExistsSql = `
     SELECT COUNT(*) as userCount
     FROM users
     WHERE id = ?;
 `;
    const [userResults]: any = await query(checkIfUserExistsSql, [id_user]);
    if (userResults[0].userCount === 0) {
        throw new Error("El usuario no existe en la base de datos.");
    }

    // Verifica si el id_book existe
    const checkIfBookExistsSql = `
     SELECT COUNT(*) as bookCount
     FROM books
     WHERE id = ?;
 `;
    const [bookResults]: any = await query(checkIfBookExistsSql, [id_book]);
    if (bookResults[0].bookCount === 0) {
        throw new Error("El libro no existe en la base de datos.");
    }

    const checkIfBorrowedSql = `
     SELECT COUNT(*) as count
     FROM lents
     WHERE id_user = ? AND id_book = ?;
 `;
    const [borrowedResults]: any = await query(checkIfBorrowedSql, [id_user, id_book]);
    if (borrowedResults[0].count === 0) {
        throw new Error("solo se puede hacer una reseña despues de prestar el libro");
    }

    const checkIfReturnedSql = `
     SELECT COUNT(*) as count
     FROM lents
     WHERE id_user = ? AND id_book = ? AND status = TRUE;
 `;
    const [notReturnedResults]: any = await query(checkIfReturnedSql, [id_user, id_book]);
    if (notReturnedResults[0].count > 0) {
        throw new Error("El usuario no ha devuelto el libro, por lo que no puede hacer una revisión.");
    }
}

export async function validateUserExist(id_user:number) {
    const checkIfUserExistsSql = `
    SELECT COUNT(*) as userCount
    FROM users
    WHERE id = ?;
`;
   const [userResults]: any = await query(checkIfUserExistsSql, [id_user]);
   if (userResults[0].userCount === 0) {
       throw new Error("El usuario no existe en la base de datos.");
   }
}

export async function validateReviewExist(id_control:number) {
    const checkIfReviewExistsSql = `
        SELECT COUNT(*) as reviewCount
        FROM reviews
        WHERE id = ?;
    `;
    const [reviewResults]: any = await query(checkIfReviewExistsSql, [id_control]);
    if (reviewResults[0].reviewCount === 0) {
        throw new Error("La review con el ID proporcionado no existe en la base de datos.");
    }
}

import { validate } from "class-validator";
import { Lent } from "../domain/lent";
import { ValidationUserLentBook } from "../domain/validations/lent";
import { ILentRepository } from "../domain/lentRepository";


export class UserLentsBookUseCase {
    constructor(readonly lentRepository: ILentRepository) {}
    
    async run(
        id_book: number,
        id_user: number,
        status: boolean,
    ): Promise<Lent | number |string | Error> {
        let post = new ValidationUserLentBook(id_book,id_user,status)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const newBookLent = await this.lentRepository.userCanLentBook(
                id_book,
                id_user,
                status
            )
            return newBookLent;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}
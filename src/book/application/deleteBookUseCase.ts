
import { validate } from "class-validator";
import { IBookRepository } from "../domain/bookRepository";
import { ValidatorId } from "../domain/validations/validatorBooks";


export class DeleteBookByIdUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(
        id: number,):Promise<number | null> {
        let post = new ValidatorId(id)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const Book = await this.bookRepository.deleteBookById(id)
            return Book;
        } catch (error) {
            return null;
        }
    }
}
import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";
import { ValidatorUpdate } from "../domain/validations/validatorBooks";


export class UpdateBookUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(
        id: number,
        description?:string
    ): Promise<Book | null> {

        let post = new ValidatorUpdate(id,description)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const newBook = await this.bookRepository.updateBookById(
                id,
                description
            )
            return newBook;
        } catch (error) {
            return null;
        }
    }
}
import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";
import { ValidatorId } from "../domain/validations/validatorBooks";


export class GetBookByIdUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(
        id: number,
    ): Promise<Book | null> {
        let post = new ValidatorId(id)

        //instance of valiadotor 
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const getBook = await this.bookRepository.getBookById(id)
            return getBook;
        } catch (error) {
            return null;
        }
    }
}
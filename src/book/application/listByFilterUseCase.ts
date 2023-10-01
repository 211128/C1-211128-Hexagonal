import { validate } from "class-validator";
import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";
import { ValidatorFilter } from "../domain/validations/validatorBooks";


export class FilterBookUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(
        filter:string,
        title?:string,
        author?:string,
    ): Promise<Book[] | null> {
        let post = new ValidatorFilter(filter,title,author)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const listByFilter = await this.bookRepository.FilterById(filter,title,author)
            return listByFilter;
        } catch (error) {
            return null;
        }
    }
}
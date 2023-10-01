import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";


export class ListAllBookUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(): Promise<Book[] | null> {
        try {
            const listAllActiveUser = await this.bookRepository.listAllBooks()
            return listAllActiveUser;
        } catch (error) {
            return null;
        }
    }
}
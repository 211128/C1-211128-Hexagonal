import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";


export class ListAllInactiveBooksUseCase {
    constructor(readonly booksRepository: IBookRepository) {}
    
    async run(
       
    ): Promise<Book[] | null> {
        
        try {
            const listAllInactiveBooks = await this.booksRepository.listAllInactiveBooks()
            return listAllInactiveBooks;
        } catch (error) {
            return null;
        }
    }
}
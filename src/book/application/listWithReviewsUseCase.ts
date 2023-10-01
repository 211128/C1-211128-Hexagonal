import { Book } from "../domain/book";
import { IBookRepository } from "../domain/bookRepository";


export class ListWithReviewsUseCase {
    constructor(readonly bookRepository: IBookRepository) {}
    
    async run(

    ): Promise<Book[] | null> {
        try {
            const listBooksWhitRewview = await this.bookRepository.listWithReviews()
            return listBooksWhitRewview;
        } catch (error) {
            return null;
        }
    }
}
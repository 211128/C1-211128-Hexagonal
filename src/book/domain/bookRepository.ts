
import { Book } from './book';

export interface IBookRepository {
    addNewBook(
        title: string,
        author: string,
        description: string,
        unique_code: string,
        img_url: string,
        canLent: boolean,
        status: boolean
    ): Promise<Book | null>

    listAllBooks(): Promise<Book[] | null>

    listAllInactiveBooks(): Promise<Book[] | null>

    updateBookById(
        id:number,
        description?: string,
    ): Promise<Book | null>;

    deleteBookById(id:number):Promise<number | null> 

    getBookById(id:number):Promise<Book | null> 

    activetedBook(id:number):Promise<number | null> 

    FilterById(
        filter:string,
        title?:string,
        author?:string,
        ):Promise<Book[] | null>

    listWithReviews():Promise<Book[] | null>
}

    import { validate } from "class-validator";
    import { Book } from "../domain/book";
    import { IBookRepository } from "../domain/bookRepository";
    import { ValidationCreateBook } from "../domain/validations/validatorBooks";


    export class AddNewBookUseCase {
        constructor(readonly bookRepository: IBookRepository) {}
        
        async run(
            title: string,
            author: string,
            description: string,
            unique_code: string,
            img_url: string,
            canLent: boolean,
            status: boolean
        ): Promise<Book | null> {
            let post = new ValidationCreateBook(title,author,description,unique_code,img_url,canLent,status)
            const validation = await validate(post)
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }

            try {
                const newBook = await this.bookRepository.addNewBook(
                    title,
                    author,
                    description,
                    unique_code,
                    img_url,
                    canLent,
                    status,
                )
                
                return newBook;
            } catch (error) {
                return null;
            }
        }
    }
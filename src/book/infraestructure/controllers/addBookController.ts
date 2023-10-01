import { Request, Response } from "express";
import { AddNewBookUseCase } from "../../application/createNewBookUseCase";


export class AddNewBookController {

    constructor(readonly addBookUseCaseController: AddNewBookUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                
                title,
                author,
                description,
                unique_code,
                img_url,
            } = req.body;
  
            const status: boolean = true;
            const canLent: boolean = true;
            // Usa el archivo cargado de req.file para subirlo a Firebase

            let newBook = await this.addBookUseCaseController.run(title, author, description, unique_code, img_url, status, canLent);

            if (newBook) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newBook
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the book."
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }
    }
}

import { Request, Response } from "express";

import { UpdateBookUseCase } from "../../application/updateBookUseCase";


export class UpdateBookController {

    constructor(readonly updateBookUseCase: UpdateBookUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                id,
                description,
            } = req.body;
            // Asegúrate de que un archivo fue enviado
          
            let updateBook = await this.updateBookUseCase.run(id,description);

            if (updateBook) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: updateBook
                    }
                });
            } 
            if (updateBook == null) {
                return res.status(404).send({
                    status: "error",
                    message: "Book not found."
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
                message: "An error occurred while updating the book."
            });
        }
    }
}

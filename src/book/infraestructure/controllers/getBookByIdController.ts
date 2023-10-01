import { Request, Response } from "express";
import { GetBookByIdUseCase } from "../../application/getBookByIdUseCase";


export class GetBookByIdController {

    constructor(readonly getBookByIdUseCase: GetBookByIdUseCase) { }

    async run(req: Request , res: Response) {
        console.log(req.body)
        try {
            let id = req.body.id as number ;
          
            let getBook = await this.getBookByIdUseCase.run(id);
    
            if (getBook) {
                return res.status(200).send({  // Cambiado el código de estado a 200 para OK
                    status: "success",
                    data: {
                        message: getBook
                    }
                });
            } else {
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
                message: "An error occurred while fetching the book."
            });
        }
    }
    
}
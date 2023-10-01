import { Request, Response } from "express";
import { GetLentUseCase } from "../../application/getLentUseCase";


export class GetLentController {

    constructor(readonly returnLentUseCase: GetLentUseCase) { }

    async run(req: Request, res: Response) {
        try {

            let {
                id
            } = req.body;

            // Castear el archivo a UploadedFile (express-fileupload)

            let newLent = await this.returnLentUseCase.run(id);
            if (newLent instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: newLent.message
                });
            } else if (newLent) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newLent
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while returning the loan book."
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
                message: "An unexpected error occurred while returning the loan book."
            });
        }
    }
}
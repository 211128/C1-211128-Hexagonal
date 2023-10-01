import { Request, Response } from "express";
import { UserLentsBookUseCase } from "../../application/userCanLentBookUseCase";


export class UserLentBookController {

    constructor(readonly userLentBookUseCase: UserLentsBookUseCase) { }

    async run(req: Request, res: Response) {
        try {

            let {
                id_book,
                id_user,
                status
            } = req.body
            

            let newLent = await this.userLentBookUseCase.run(id_book, id_user,status);
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
                    message: "An unexpected error occurred while adding loan book."
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
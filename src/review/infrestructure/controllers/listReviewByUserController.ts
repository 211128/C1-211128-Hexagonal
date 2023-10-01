import { Request, Response } from "express";
import { ListReviewByUserUseCase } from "../../application/listReviewsByUserUseCase";

export class ListReviewByUserController {
    constructor(readonly listReviewByUserUseCase : ListReviewByUserUseCase) {}
    async run(req:Request, res:Response) {

        try {
            let {
                id
            } = req.body

            let listReviews = await this.listReviewByUserUseCase.run(id as number)

            if (listReviews instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: listReviews.message
                });
            } else if (listReviews) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Review: listReviews
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while list the Review."
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
                message: "An error occurred while list the reviews."
            });
        }

    }
   
}
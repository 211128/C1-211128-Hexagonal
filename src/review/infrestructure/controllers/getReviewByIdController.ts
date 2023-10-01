import { Request, Response } from "express";
import { GetReviewByIdUseCase } from "../../application/getReviewByIdUseCase";

export class GetReviewByIdController {
    constructor(readonly getReviewByIdUseCase : GetReviewByIdUseCase) {}
    async run(req:Request, res:Response) {

        try {
            let {
                id
            } = req.body

            let getReview = await this.getReviewByIdUseCase.run(id as number)

            if (getReview instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: getReview.message
                });
            } else if (getReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Review: getReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while get the Review."
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
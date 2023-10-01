import { Request, Response } from "express";

import { UpdateReviewUseCase } from "../../application/updateReviewUseCase";


export class UpdateReviewController {

    constructor(readonly updateReviewUseCase: UpdateReviewUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                id_control,
                id_user,
                content
            } = req.body;
           
           
            
            let newReview = await this.updateReviewUseCase.run(id_control,id_user,content);

            if (newReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        newReview: newReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the review."
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




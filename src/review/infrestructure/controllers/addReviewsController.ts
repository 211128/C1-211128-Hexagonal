import { Request, Response } from "express";
import { AddReviewUseCase } from "../../application/addReviewUseCase";


export class AddNewReviewController {

    constructor(readonly addReviewUseCase: AddReviewUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                
                id_user,
                id_book,
                content  
            } = req.body;
           
           
            let newReview = await this.addReviewUseCase.run(id_user,id_book,content);

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




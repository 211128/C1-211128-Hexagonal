import { Response } from "express";
import { ListInactiveReviewsUseCase } from "../../application/listReviewsInactive";



export class ListInactiveReviewsController {
    constructor(readonly listInactiveReviewsUseCase : ListInactiveReviewsUseCase) {}
    async run(res:Response) {
        try {
            let listInactiveReviews = await this.listInactiveReviewsUseCase.run()

            if(listInactiveReviews){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listInactiveReviews
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "reviewa not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the reviews."
            });
        }

    }
   
}
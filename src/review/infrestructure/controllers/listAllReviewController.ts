import { Response } from "express";
import { ListAllReviewsUseCase } from "../../application/listAllReviewsUseCase";



export class ListAllReviewsController {
    constructor(readonly listAllReviewsUseCase : ListAllReviewsUseCase) {}
    async run( res:Response) {
        console.log('controller')
        try {
            let listAllReviews = await this.listAllReviewsUseCase.run()

            if(listAllReviews){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listAllReviews
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "review not found(missing)"
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
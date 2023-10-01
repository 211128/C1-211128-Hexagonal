import { Response } from "express";
import { ListWithReviewsUseCase } from "../../application/listWithReviewsUseCase";



export class ListWithReviewsController {
    constructor(readonly listByFilterUseCase : ListWithReviewsUseCase) {}
    async run(res:Response) {
        try {
            let listByFilter = await this.listByFilterUseCase.run()

            if(listByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listByFilter
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Books not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the books."
            });
        }

    }
}
import { Response } from "express";
import { ListAllInactiveBooksUseCase } from "../../application/listAllBooksInactiveUseCase";

export class ListAllInactiveBooksController {
    constructor(readonly listAllBooksInactiveUseCase : ListAllInactiveBooksUseCase) {}
    async run(res:Response) {
        try {
            let listAllBooksInactive = await this.listAllBooksInactiveUseCase.run()
            if(listAllBooksInactive){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list: listAllBooksInactive
                    }
                })
            }else{
                return res.status(200).send({
                    status: "succes",
                    message: "Books not found or missing"
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
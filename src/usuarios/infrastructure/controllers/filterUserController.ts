import { Request, Response } from "express";
import { FilterUserUseCase } from "../../application/filterUserUseCase";

export class FilterUserController {
    constructor(readonly filterUserUseCase: FilterUserUseCase) {}

    async run(req:Request, res:Response) {
        try {
            let {
                filter,
                name,
                phone,
                email,
            } = req.body
            let getUserByFilter = await this.filterUserUseCase.run(filter as string, email as string, name as string, phone as string)

            if(getUserByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getUserByFilter: "tenga sus filtros pa"
                    }
                })
            } else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found."
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });   
        }
    }
}

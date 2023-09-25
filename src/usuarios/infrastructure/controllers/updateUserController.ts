import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";


export class UpdateUserController {
    constructor(readonly updateUserUseCase : UpdateUserUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                id,
                name,
                phone,
                email,
            } = req.body
        
            let UpdateUserById = await this.updateUserUseCase.run(id,name,phone,email)

            if(UpdateUserById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: "usuario: " + name + "actualizado",
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found or not updated."
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update user the user."
            });   
        }
    }
}

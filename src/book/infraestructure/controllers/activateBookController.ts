import { Request, Response } from "express";
import { ActivatedBookUseCae } from "../../application/activeBookUseCase";




export class ActivatedBookController {
    constructor(readonly ActivateBookUseCae : ActivatedBookUseCae) {}
    async run(req:Request, res:Response) {
        try {
            let {
                id,
            } = req.body
        
            let activateUser = await this.ActivateBookUseCae.run(id)

            if(activateUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateUser
                    }
                })
            }
            if (activateUser == null) {
                return res.status(404).send({
                    status: "error",
                    message: "Libro no encontrado."
                });
            }
            
        }  catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Fallo la validacion",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            console.error("error en controlador:", error);
            return res.status(500).send({
                status: "error",
                message: "error cuando se intentó activar."
            });
        }
        
    }
}
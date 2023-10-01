import { validate } from "class-validator";
import { Lent } from "../domain/lent";
import { ValidationLentId } from "../domain/validations/lent";
import { ILentRepository } from "../domain/lentRepository";


export class GetLentUseCase {
    constructor(readonly lentRepository: ILentRepository) {}
    
    async run(
        id: number,
     
    ): Promise<Lent | number | string |Error>  {
        let post = new ValidationLentId(id)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const returnLent = await this.lentRepository.returnLent(id)
            return returnLent;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}
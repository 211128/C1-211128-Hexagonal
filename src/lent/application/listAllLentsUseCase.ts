
import { Lent } from "../domain/lent";
import { ILentRepository } from "../domain/lentRepository";


export class ListAllLentsUseCase {
    constructor(readonly lentRepository: ILentRepository) {}
    
    async run(): Promise<Lent[] | string | Error>  {
        try {
            const returnLent = await this.lentRepository.getAllLents()
            return returnLent;
        } catch (error) {
            console.log(error)
            return (error as Error)
        }
    }
}
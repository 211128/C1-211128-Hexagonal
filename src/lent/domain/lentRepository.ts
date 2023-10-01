import { Lent } from "./lent"

export interface ILentRepository {
    userCanLentBook(
        id_book: number,
        id_user: number,
        status: boolean
    ): Promise<Lent | Error> 
    returnLent(
        id:number
    ):Promise<number |string| Error>

    getAllLents():Promise<Lent[] | string |  Error>
}
import { Reviews } from "./reviews";

export interface IreviewRepository {
   addReviewByUser(
      id_user: number,
      id_book: number,
      content: string,
      status: boolean
   ): Promise<Reviews | null | Error | string | number>

   listAllReview(): Promise<Reviews[] | null>

   listReviewsByUser(id:number):Promise<Reviews[] | number>

   getReviewById(id:number):Promise<Reviews | number | null>

   listInactiveReviews():Promise<Reviews[] | null>

   deleteReviewById(id_control:number,id_user:number):Promise<number | Error>

   updateReviewById(id_control:number,id_user:number, content:string,):Promise<Reviews| Error | string | number>   
}
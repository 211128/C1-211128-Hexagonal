
import { validate } from "class-validator";
import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidatorCreateReview } from "../domain/validation/validationsReview";


export class AddReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) { }
   
    async run(
        id_user: number,
        id_book: number,
        content: string,
    ): Promise<Reviews | null | Error | string | number>  {

        const status:boolean = true
        let post = new ValidatorCreateReview(id_user,id_book,content,status);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        } try {
            const newReview = await this.ireviewRepository.addReviewByUser( id_user, id_book, content, status)
            return newReview;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}
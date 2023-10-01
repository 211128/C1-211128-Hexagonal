import { validate } from "class-validator";
import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateUpdate } from "../domain/validation/validationsReview";


export class UpdateReviewUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) { }
   
    async run(
        id_control: number,
        id_user:number,
        content: string,
    ): Promise<Reviews | null | Error | string | number>  {
        let post = new ValidateUpdate(id_control,id_user,content);

        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        } try {

            const updateReview = await this.ireviewRepository.updateReviewById(id_control,id_user,content)
            console.log(updateReview)
            return updateReview;
        } catch (error) {
            console.log(error)
            return (error as Error).message;
        }
    }
}
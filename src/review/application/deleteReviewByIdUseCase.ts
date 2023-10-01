import { validate } from "class-validator";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateIds } from "../domain/validation/validationsReview";



export class DeleteReviewByIdUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(
        id_control:number,
        id_user:number
    ): Promise<string | Error | number> {

        let post = new ValidateIds(id_control,id_user);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const DeleteReview = await this.ireviewRepository.deleteReviewById(id_control,id_user)
            return DeleteReview;
        } catch (error) {
            return (error as Error).message;
        }
    }
}
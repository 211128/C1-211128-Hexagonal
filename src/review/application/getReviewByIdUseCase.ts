import { validate } from "class-validator";
import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";
import { ValidateId } from "../domain/validation/validationsReview";



export class GetReviewByIdUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(
        id:number
    ): Promise<Reviews | number | null> {

        let post = new ValidateId(id);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const listAllActiveUser = await this.ireviewRepository.getReviewById(id)
            return listAllActiveUser;
        } catch (error) {
            return null
        }
    }
}
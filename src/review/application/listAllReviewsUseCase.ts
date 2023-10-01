import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";



export class ListAllReviewsUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(): Promise<Reviews[] | null> {
        try {
            const listAllActiveUser = await this.ireviewRepository.listAllReview()
            return listAllActiveUser;
        } catch (error) {
            return null;
        }
    }
}
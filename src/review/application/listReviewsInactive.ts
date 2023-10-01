import { Reviews } from "../domain/reviews";
import { IreviewRepository } from "../domain/reviewRepository";



export class ListInactiveReviewsUseCase {
    constructor(readonly ireviewRepository: IreviewRepository) {}
    
    async run(): Promise<Reviews[] | null> {
        try {
            const listReviewsInactive = await this.ireviewRepository.listInactiveReviews()
            return listReviewsInactive;
        } catch (error) {
            return null;
        }
    }
}
export class Reviews {
    constructor(
        public id: number,
        public id_user: number,
        public id_book: number,
        public content:string,
        public status:boolean
    ) {
        
    }
}
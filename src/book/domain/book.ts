export class Book {
    constructor(
       public id: number,
       public title: string,
       public author: string,
       public description: string,
       public unique_code: string,
       public img_url: string,
       public canLent: boolean,
       public status: boolean
    ){}
    
}
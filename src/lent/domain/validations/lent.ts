import { IsNumber, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, isNumber } from 'class-validator';

export class ValidationUserLentBook {

    @IsNotEmpty()
    public id_book: number;
    @IsNotEmpty()
    public id_user: number;
    @IsNotEmpty()
    @IsBoolean()    
    public status: boolean;
    constructor(
        id_book: number,
        id_user: number,
        status: boolean
    ) {
        this.id_book = id_book;
        this.id_user = id_user;
        this.status = status;
    }
}

export class ValidationLentId {
    @IsNotEmpty()
    public id: number;
    constructor(id:number){
        this.id = id
    }
}
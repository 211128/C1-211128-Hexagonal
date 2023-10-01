import { IsString, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, IsNotIn, IsNumber } from 'class-validator';


export class ValidatorCreateReview {

    @IsNotEmpty()
    @IsNumber()
    id_user: number;
    @IsNotEmpty()
    @IsNumber()
    id_book: number;
    @IsNotEmpty()
    @IsString()
    @Length(1, 1550)
    content: string;
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
    constructor(
        id_user: number,
        id_book: number,
        content: string,
        status: boolean) {
            this.id_user = id_user,
            this.id_book = id_book,
            this.content = content,
            this.status = status
    }
}

export class ValidateId {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

export class ValidateIds {
    @IsNotEmpty()
    @IsNumber()
    id_control: number;
    @IsNotEmpty()
    @IsNumber()
    id_user: number;
    constructor(id_control: number, id_user: number) {
        this.id_control = id_control;
        this.id_user = id_user;
    }
}

export class ValidateUpdate {
    @IsNotEmpty()
    @IsNumber()
    id_control: number;
    @IsNotEmpty()
    @IsNumber()
    id_user: number;
    @IsNotEmpty()
    @IsString()
    @Length(1, 1550)
    content: string;
    constructor(
        id_control: number,
        id_user: number,
        content: string,
    ) {
        this.id_control = id_control,
        this.id_user = id_user,
        this.content = content
    }
}
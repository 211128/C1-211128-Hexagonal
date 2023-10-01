import { IsString,isNumber, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional, IsNumber } from 'class-validator';

export class ValidationCreateBook {

 


    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public author: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public unique_code: string;

    @IsNotEmpty()
    @IsString()
    public img_url: string;

    @IsNotEmpty()
    @IsBoolean()
    public canLent: boolean;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    constructor(
        title: string,
        author: string,
        description: string,
        unique_code: string,
        img_url: string,
        canLent: boolean,
        status: boolean,
    ) { 
        this.title = title;
        this.author = author;
        this.description = description;
        this.unique_code = unique_code;
        this.img_url = img_url;
        this.canLent = canLent;
        this.status = status;
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    description?: string;

    constructor(
        id: number,
        title?: string,
        author?: string,
        description?: string
    ) {
        this.id = id,
            this.title = title,
            this.author = author,
            this.description = description

    }
}

export class ValidatorFilter {
    @IsNotEmpty()
    @IsIn(['title', 'author'])
    filter: string;

    @ValidateIf(o => o.filter === 'title')
    @IsNotEmpty()
    title?: string;

    @ValidateIf(o => o.filter === 'author')
    @IsNotEmpty()
    author?: string;


    constructor(
        filter: string,
        title?: string,
        author?: string
    ) {
        this.filter = filter,
            this.title = title,
            this.author = author
    }
}

export class ValidatorId {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}
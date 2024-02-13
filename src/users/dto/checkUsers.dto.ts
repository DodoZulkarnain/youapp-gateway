import { MinLength, IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class checkUserDto {
    @IsOptional()
    @IsString()
    _id : string

    @IsOptional()
    @MinLength(4)
    username: string;

    @IsOptional()
    @IsString()
    fullName: string

    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsOptional()
    handphone: number

    @IsOptional()
    avatar: string
}
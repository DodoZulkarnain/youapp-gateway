import { IsHash, IsNotEmpty, MinLength, IsEmail, IsNumber, IsString, IsOptional } from "class-validator"

export class LoginDto {
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
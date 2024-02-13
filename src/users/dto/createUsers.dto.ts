import { MinLength, IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class createUserDTO {
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}
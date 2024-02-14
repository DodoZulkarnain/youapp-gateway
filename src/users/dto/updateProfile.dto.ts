import { IsBase64, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional } from "class-validator";

export class updateProfileDto {
    @IsOptional()
    _id : string

    @IsNotEmpty()
    fullname: string

    @IsOptional()
    @IsEnum({
        Man : 'Man',
        Woman : 'Woman'
    })
    gender: string

    @IsOptional()
    @IsDate()
    birthday: Date

    @IsOptional()
    @IsEnum({
        Virgo : 'Virgo',Cancer: 'Cancer',Gemini : 'Gemini',Aquarius: 'Aquarius',
        Aries: 'Aries',Libra: 'Libra',Pisces : 'Pisces',Taurus: 'Taurus',Capricon : 'Capricorn',
        Leo: 'Leo',Sagitarius : 'Sagitarius',Scorpio : 'Scorpio'
    })
    horoscope: string

    @IsOptional()
    @IsEnum({
        Virgo : 'Virgo',Cancer: 'Cancer',Gemini : 'Gemini',Aquarius: 'Aquarius',
        Aries: 'Aries',Libra: 'Libra',Pisces : 'Pisces',Taurus: 'Taurus',Capricon : 'Capricorn',
        Leo: 'Leo',Sagitarius : 'Sagitarius',Scorpio : 'Scorpio'
    })
    zodiac: string

    @IsOptional()
    @IsNumber()
    height: number

    @IsOptional()
    @IsNumber()
    weight: number

    @IsOptional()
    @IsBase64()
    avatar: string

    @IsOptional()
    about: string

    @IsOptional()
    @IsObject()
    Interest: object
}
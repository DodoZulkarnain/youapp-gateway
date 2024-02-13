import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from "./user.schema";
import { Interest } from "./interest.schema";

@Schema()
export class Profile extends Document {
    @Prop({ required: false })
    fullName: string;

    @Prop({ 
        required:false,
        enum : ['Man','Women']
    })
    gender: string;

    @Prop({
        required: false,
        type: Date
    })
    birthday: Date

    @Prop({ 
        required: false,
        enum : ['Virgo','Cancer','Gemini','Aquarius','Aries','Libra','Pisces','Taurus','Capricorn','Leo','Sagitarius','Scorpio']
    })
    horoscope: string;

    @Prop({ 
        required: false,
        enum : ['Virgo','Cancer','Gemini','Aquarius','Aries','Libra','Pisces','Taurus','Capricorn','Leo','Sagitarius','Scorpio']
    })
    zodiac: string;

    @Prop({
        required: false
    })
    height: number

    @Prop({
        required: false
    })
    weight: number

    @Prop({ 
        required: false
    })
    handphone: number;

    @Prop({ required: false })
    avatar: string;

    @Prop({ required: false })
    about: string;

    @Prop({ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }],
    })
    interest: Interest[]

    @Prop({ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    })
    user: User
}

export const profileSchema = SchemaFactory.createForClass(Profile);
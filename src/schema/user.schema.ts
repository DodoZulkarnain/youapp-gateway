import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { UserToken } from './userToken.schema';
import { Profile } from "./profile.schema";

@Schema()
export class User extends Document {
    
    @Prop({ 
        required: true,
        unique: true 
    })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ 
        required: true,
        unique: true 
    })
    email: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }] })
    profile : Profile

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserToken' }] })
    tokens : UserToken[]
}

export const userSchema = SchemaFactory.createForClass(User);
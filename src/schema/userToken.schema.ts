import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document,Types } from 'mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class UserToken extends Document {
    @Prop({
        required: false 
    })
    refresToken: string

    @Prop({
        required: true
    })
    expiredDate: string

    @Prop({ 
        required: true, 
        default: true 
    })
    is_status: boolean;
}

export const userTokenSchema = SchemaFactory.createForClass(UserToken);
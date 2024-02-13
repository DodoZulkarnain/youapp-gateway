import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Interest extends Document {
    
    @Prop({ 
        required: true,
        unique: true 
    })
    name: string;

    @Prop({
        required: false
    })
    description : string
}

export const interestSchema = SchemaFactory.createForClass(Interest);
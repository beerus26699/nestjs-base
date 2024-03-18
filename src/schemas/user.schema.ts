import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: false })
    password: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    avatar: string;

    @Prop({ required: true })
    pDoneId: string;

    @Prop({ required: true })
    isPDone: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

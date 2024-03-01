import {Schema, Model, model, Document} from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: { type: String, required: true}
})


export const User: Model<IUser> = model<IUser>('User', UserSchema);

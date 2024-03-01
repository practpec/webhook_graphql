import {Schema, Model, model, Document} from 'mongoose'

export interface IProject extends Document {
    name: string;
    createdBy:string;
}

const ProjectSchema: Schema = new Schema({
    name: {type: String, required: true},
    createdBy: {type: String, required: true}
})

export const Project: Model<IProject> = model<IProject>('Project', ProjectSchema);
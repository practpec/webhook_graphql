import {Schema, Model, model, Document} from 'mongoose'

export interface ITask extends Document {
    name: string;
    description: string;
    idProject:string;
    createdBy:string;
}

const TaskSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    idProject: {type: String, required: true},
    createdBy: {type: String, required: true}
})

export const Task: Model<ITask> = model<ITask>('Task', TaskSchema);
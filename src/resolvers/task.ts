import { Task } from "../model/task";
import { WebhookEvent } from "../model/webhookEvent";
import { notifyEvent } from '../utils/notifyEvent';

interface Args {
    id: string;
    name: string;
    description: string;
    idProject: string;
    createdBy: string;
    page: number;
    limit: number;
}

export const TaskResolver = {
    Query: {
        tasks: async (_: any, args: Args) => {
            try {
                const startIndex = (args.page - 1) * args.limit;
                const tasks = await Task.find({}).skip(startIndex).limit(args.limit);
                if (!tasks) throw new Error('No tasks found');
                return {
                    success: true,
                    total: tasks.length,
                    tasks,
                    page: args.page,
                    limit: args.limit
                };
            } catch (error) {
                throw error;
            }
        },

        task: async (_: any, args: Args) => {
            try {
                if (!args.id) throw new Error('No id provided');
                const task = await Task.findById(args.id);
                if (!task) throw new Error('No task found');
                return task;
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        addTask: async (_: any, args: Args) => {
            try {
                const task = await Task.findOne({ name: args.name });
                if (task) throw new Error('Task already exists');
                const newTask = await Task.create({
                    name: args.name,
                    description: args.description,
                    idProject: args.idProject,
                    createdBy: args.createdBy
                })
                const webhooks = await WebhookEvent.find({ event: 'createTask' });
                for (const webhook of webhooks) {
                    await notifyEvent(webhook.webhookUrl, `Se ha creado una nueva tarea ${args.name}`);
                }
                return newTask;
            } catch (error) {
                throw error;
            }
        },

        updateTask: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const task = await Task.findById(args.id);
                if (!task) throw new Error('No task found');
                const updateTask = await Task.findByIdAndUpdate(id, { ...args }, { new: true, runValidators: true });
                return updateTask;
            } catch (error) {
                console.log(error)
            }
        },

        deleteTask: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const task = await Task.findById(args.id);
                if (!task) throw new Error('No task found');
                const deleteTask = await Task.findByIdAndDelete(id);
                return {
                    success: true,
                    message: 'Task deleted successfully',
                    id: deleteTask?._id
                };
            } catch (error) {
                throw error;
            }
        }
    }
}
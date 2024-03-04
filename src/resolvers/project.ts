import { Project } from "../model/projects";
import { WebhookEvent } from "../model/webhookEvent";
import { notifyEvent } from '../utils/notifyEvent';

interface Args {
    id: string;
    name: string;
    createdBy: string;
}

export const ProjectsResolver = {
    Query: {
        projects: async () => {
            try {
                const projects = await Project.find({});
                if (!projects) throw new Error('No projects found');
                return {
                    success: true,
                    total: projects.length,
                    projects
                };
            } catch (error) {
                throw error;
            }
        },

        project: async (_: any, args: Args) => {
            try {
                if (!args.id) throw new Error('No id provided');
                const project = await Project.findById(args.id);
                if (!project) throw new Error('No project found');
                return project;
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        addProject: async (_: any, args: Args) => {
            try {
                const project = await Project.findOne({ name: args.name });
                if (project) throw new Error('Project already exists');
                const newProject = await Project.create({
                    name: args.name,
                    createdBy: args.createdBy
                })
                const webhooks = await WebhookEvent.find({ event: 'createProject' });
                for (const webhook of webhooks) {
                    await notifyEvent(webhook.webhookUrl, `Se ha creado un nuevo proyecto ${args.name}`);
                }
                return newProject;
            } catch (error) {
                throw error;
            }
        },

        updateProject: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const project = await Project.findById(args.id);
                if (!project) throw new Error('No project found');
                const updateProject = await Project.findByIdAndUpdate(id, { ...args }, { new: true, runValidators: true });
                return updateProject;
            } catch (error) {
                console.log(error)
            }
        },

        deleteProject: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const project = await Project.findById(args.id);
                if (!project) throw new Error('No project found');
                const deleteProject = await Project.findByIdAndDelete(id);
                return {
                    success: true,
                    message: 'Project deleted successfully',
                    id: deleteProject?._id
                };
            } catch (error) {
                throw error;
            }
        }
    }
}
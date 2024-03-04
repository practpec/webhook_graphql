import { User } from '../model/user';
import { WebhookEvent } from "../model/webhookEvent";
import { createPasswordHash } from '../utils/bcrypt/createPasswordHash.util'
import { notifyEvent } from '../utils/notifyEvent';
import { comparePassword } from '../utils/bcrypt/compareCredentials.util';
import { createJwt } from '../utils/jwt/createJwt.util';
import dotenv from "dotenv";

dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface Args {
    id: string;
    username: string;
    email: string;
    password: string;
    page: number;
    limit: number;
    webhook: string;
}

export const UsersResolver = {
    Query: {
        users: async (_: any, args: Args) => {
            try {
                const startIndex = (args.page - 1) * args.limit;
                const users = await User.find({}).skip(startIndex).limit(args.limit);
                if (!users) throw new Error('No users found');
                return {
                    success: true,
                    total: users.length,
                    users,
                    page: args.page,
                    limit: args.limit
                };
            } catch (error) {
                throw error;
            }
        },

        user: async (_: any, args: Args) => {
            try {
                if (!args.id) throw new Error('No id provided');
                const user = await User.findById(args.id);
                if (!user) throw new Error('No user found');
                return user;
            } catch (ex) {
                throw ex;
            }
        }
    },

    Mutation: {
        regUser: async (_: any, args: Args) => {
            try {
                const user = await User.findOne({ email: args.email });
                if (user) throw new Error('User already exists');
                const passwordYes = createPasswordHash(args.password)
                const newUser = await User.create({
                    username: args.username,
                    email: args.email,
                    password: passwordYes
                })
                //webhook para enviar mensaje a Discord
                const webhooks = await WebhookEvent.find({ event: 'createUser' });
                for (const webhook of webhooks) {
                    await notifyEvent(webhook.webhookUrl, `Se ha registrado un nuevo usuario ${args.username}`);
                }
                return newUser;
            } catch (error) {
                throw error;
            }
        },

        loginUser: async (_: any, args: Args) => {
            try {
                const user = await User.findOne({ email: args.email });
                if (!user) throw new Error('User not found');
                const validPassword = await bcrypt.compare(args.password, user.password);
                if (!validPassword) {
                    throw new Error('Incorrect password');
                }
                const jwtSecret = process.env.JWT_SECRET || '';
                const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
                return {
                    success: true,
                    user,
                    token
                };
            } catch (error) {
                throw error;
            }
        },

        updateUser: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const user = await User.findById(args.id);
                if (!user) throw new Error('User not found');
                const newPassword = await bcrypt.hash(args.password, 10);
                const updateUser = await User.findByIdAndUpdate(id, {
                    username: args.username,
                    email: args.email,
                    password: newPassword
                }, { new: true, runValidators: true });
                return updateUser;
            } catch (error) {
                throw error;
            }
        },

        deleteUser: async (_: any, args: Args) => {
            try {
                const id = args.id;
                if (!id) throw new Error('No id provided');
                const user = await User.findById(args.id);
                if (!user) throw new Error('User not found');
                const deleteUser = await User.findByIdAndDelete(id);
                return {
                    success: true,
                    message: 'User deleted successfully',
                    id: deleteUser?._id
                };
            } catch (error) {
                throw error;
            }
        }
    }
}
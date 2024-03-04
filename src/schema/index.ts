import {mergeTypeDefs} from "@graphql-tools/merge"

import { usersGQLSchema } from "./user"
import { projectsGQLSchema } from "./projects"
import { tasksGQLSchema } from "./tasks"
import { webhooksGQLSchema } from "./webhooks"

export const mergedGQLSchema = mergeTypeDefs([usersGQLSchema, projectsGQLSchema, tasksGQLSchema, webhooksGQLSchema])
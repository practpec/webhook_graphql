import {mergeTypeDefs} from "@graphql-tools/merge"

import { usersGQLSchema } from "./user"
import { projectsGQLSchema } from "./projects"
import { tasksGQLSchema } from "./tasks"

export const mergedGQLSchema = mergeTypeDefs([usersGQLSchema, projectsGQLSchema, tasksGQLSchema])
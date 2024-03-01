import { UsersResolver } from "./user";
import {ProjectsResolver} from "./project"
import { TaskResolver } from "./task";

export const resolvers = [UsersResolver, ProjectsResolver, TaskResolver];
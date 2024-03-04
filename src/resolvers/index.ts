import { UsersResolver } from "./user";
import { ProjectsResolver } from "./project"
import { TaskResolver } from "./task";
import { WebhookResolver } from "./webhook";

export const resolvers = [UsersResolver, ProjectsResolver, TaskResolver, WebhookResolver];
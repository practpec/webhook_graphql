import { buildSchema } from "graphql";

export const webhooksGQLSchema = buildSchema(`
    type Webhook {
        id: String
        url: String
        events: [String]
    }

    type Mutation {
        addWebhook(url: String, events: [String]): Webhook
    }
`)
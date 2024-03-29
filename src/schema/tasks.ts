import {buildSchema} from "graphql"

export const tasksGQLSchema = buildSchema(`
    type Task {
        id: String!
        name: String!
        description: String!
        idProject: String!
        createdBy: String!
    }

    type Query {
        tasks: tasksInfoResponse!
        task(id: String!): Task!
    }

    type tasksInfoResponse {
        success: Boolean!
        total: Int!
        tasks: [Task!]!
    }

    type Mutation {
        addTask(name: String!, description:String!, idProject:String!, createdBy: String!): Task!
        updateTask(id: String!, name: String!, description:String!, idProject:String!, createdBy: String): Task!
        deleteTask(id: String!): deleteResponse!
    }
    type deleteResponse {
        success: Boolean!
        message: String!
        id: String!
    }
`)
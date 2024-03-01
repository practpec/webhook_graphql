import {buildSchema} from "graphql"

export const projectsGQLSchema = buildSchema(`
    type Project {
        id: String!
        name: String!
        createdBy: String!
    }

    type Query {
        projects: projectsInfoResponse!
        project(id: String!): Project!
    }

    type projectsInfoResponse {
        success: Boolean!
        total: Int!
        projects: [Project!]!
    }

    type Mutation {
        addProject(name: String!, createdBy: String!): Project!
        updateProject(id: String!, name: String, createdBy: String): Project!
        deleteProject(id: String!): deleteResponse!
    }

    type deleteResponse {
        success: Boolean!
        message: String!
        id: String!
    }
`)
import { buildSchema } from "graphql";

export const usersGQLSchema = buildSchema(`
    type User {
        id: String!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        users(page: Int!, limit: Int!): usersInfoResponse!
        user(id: String!): User!
    }

    type usersInfoResponse {
        success: Boolean!
        total: Int!
        page: Int!
        limit: Int!
        users: [User!]!
    }

    type Mutation {
        regUser(username: String!, email: String!, password: String!): User!
        loginUser(email: String!, password: String!): loginResponse!
        updateUser(id: String!, username: String, email: String, password: String): User!
        deleteUser(id: String!): deleteResponse!
    }

    type loginResponse {
        success: Boolean!
        user: User!
        token: String!
    }

    type deleteResponse {
        success: Boolean!
        message: String!
        id: String!
    }
`)
require("dotenv").config()
//
import { connectDB } from "./db/connect";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergedGQLSchema } from "./schema";
import { resolvers } from "./resolvers";
import context from "../src/context/context";

const PORT = parseInt(process.env.PORT as string) || 3000

const server = new ApolloServer({
    typeDefs : mergedGQLSchema,
    resolvers : resolvers,
    introspection : true
  });

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI as string)

        startStandaloneServer(server, { 
            listen: { port: PORT },
            context, 
        });

        console.log(`Servidro corriendo en el puerto ${PORT}`)
    } catch (error) {
        console.log(error)
    }
}

start()
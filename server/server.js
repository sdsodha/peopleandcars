import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { typeDefs, resolvers } from './src/peopleCarsScheme' 

const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    
    await server.start();
    server.applyMiddleware({ app });
    
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`Server is running at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
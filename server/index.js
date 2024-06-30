import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { connectDB } from './database/db.js';
import mergedTypeDef from './typeDefs/index.js';
import mergedResolver from './resolvers/index.js';
import path from 'path';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDef,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

// TODO - context: async ({ req, res }) => buildContext({ req, res }),
app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:3000',
        // origin: 'https://c923-203-211-108-227.ngrok-free.app',
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => ({ req }),
    }),
);

// TODO - Uncomment for deployment
// app.use(express.static(path.join(__dirname, "client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/dist", "index.html"))
// });

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();
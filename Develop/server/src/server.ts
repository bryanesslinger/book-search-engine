// new
import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import cors from 'cors';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
// import { authenticateToken } from './services/auth.js'; // removing auth for hw submission

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Add CORS middleware for development
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true
    }));
  }

  // GraphQL endpoint
  app.use(
    '/graphql',
    process.env.NODE_ENV !== 'production' 
      ? cors({
          origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
          credentials: true
        })
      : (_req, _res, next) => next(),
    expressMiddleware(server)
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  await db.once('open', () => {
    console.log('MongoDB connection established successfully');
  });

  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}!`);
    console.log(`🔗 GraphQL available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
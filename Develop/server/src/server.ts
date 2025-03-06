// //I reccomend getting rid of the code below but you can comment it out
// import express from 'express';
// import path from 'node:path';
// import db from './config/connection.js';
// import routes from './routes/index.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });



// Uncomment this code below

// import express from 'express';
// import path from 'node:path';
// import type { Request, Response } from 'express';
// // Import the ApolloServer class
// import {
//   ApolloServer,
// } from '@apollo/server';
// import {
//   expressMiddleware
// } from '@apollo/server/express4';
// import { authenticateToken } from './services/auth-service.js';
// // Import the two parts of a GraphQL schema
// import { typeDefs, resolvers } from './schemas/index.js';
// import db from './config/connection.js';


// const PORT = process.env.PORT || 3001;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const app = express();

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();
//   await db;

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());

//   app.use('/graphql', expressMiddleware(server as any,
//     {
//       context: authenticateToken as any
//     }
//   ));

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (_req: Request, res: Response) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//   });

// };

// // Call the async function to start the server
// startApolloServer();


// new
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async (contextValue) => {
        const { req } = contextValue;
        const authContext = authenticateToken({ req });
  
        console.log("🛠️ GraphQL Context:", authContext);
  
        return authContext;
      },
    })
  );
  
  

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 GraphQL Playground: http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

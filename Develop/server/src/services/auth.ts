// This file is kept as a placeholder for future authentication implementation
export {};

// import type { Request } from 'express';
// import jwt from 'jsonwebtoken';
// import { GraphQLError } from 'graphql';
// import dotenv from 'dotenv';
// dotenv.config();

// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string,
// }

// export const authenticateToken = ({ req }: { req: Request }) => {
//   // allows token to be sent via req.body, req.query, or headers
//   let token = req.body.token || req.query.token || req.headers.authorization;

//   if (req.headers.authorization) {
//     token = token.split(' ').pop().trim();
//   }

//   if (!token) {
//     return req;
//   }

//   try {
//     const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
//     req.user = data as JwtPayload;
//   } catch (err) {
//     console.log('Invalid token');
//   }

//   return req;
// };

// export const signToken = (username: string, email: string, _id: unknown) => {
//   const payload = { username, email, _id };
//   const secretKey: any = process.env.JWT_SECRET_KEY;

//   return jwt.sign({data: payload}, secretKey, { expiresIn: '2h' });
// };

// export class AuthenticationError extends GraphQLError {
//   constructor(message: string) {
//     super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
//     Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
//   }
// };


// NEW ATTEMPT - commenting out to get rid of auth for hw submission

// import type { Request } from 'express';
// import jwt from 'jsonwebtoken';
// import { GraphQLError } from 'graphql';
// import dotenv from 'dotenv';

// dotenv.config();

// interface JwtPayload {
//   _id: string;
//   username: string;
//   email: string;
// }


// export const authenticateToken = ({ req }: { req: Request }) => {
//   let token = req.headers.authorization || req.body.token || req.query.token;

//   console.log("🔍 Received Authorization Header:", req.headers.authorization);
//   console.log("🔍 Received Token (Before Processing):", token);


//   if (token && token.startsWith('Bearer ')) {
//     token = token.split(' ')[1];
//   }

//   console.log("🔍 Processed Token (After Bearer Split):", token);

//   if (!token) {
//     console.log("⚠️ No token found in request headers.");
//     return { user: null };
//   }

//   const secretKey = process.env.JWT_SECRET_KEY;
//   if (!secretKey) {
//     console.error("❌ JWT_SECRET_KEY is missing from environment variables!");
//     throw new Error("Server misconfiguration: JWT_SECRET_KEY is required.");
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey) as { data: JwtPayload };
//     console.log("✅ Token successfully verified:", decoded.data);
//     return { user: decoded.data }; // Return extracted user
//   } catch (err) {
//     console.log("❌ Invalid token:", (err as Error)?.message || "Unknown Error");
//     return { user: null };
//   }
// };


// export const signToken = (username: string, email: string, _id: string) => {
//   const secretKey = process.env.JWT_SECRET_KEY;
//   if (!secretKey) {
//     throw new Error("Server misconfiguration: JWT_SECRET_KEY is required.");
//   }

//   const payload = { username, email, _id };

//   console.log("🔑 Signing Token with Payload:", payload);

//   return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
// };


// export class AuthenticationError extends GraphQLError {
//   constructor(message: string) {
//     super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
//     Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
//   }
// };

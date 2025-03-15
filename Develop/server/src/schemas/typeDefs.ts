import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book!]
  }

  type Book {
    bookId: String!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String
  }

  type Query {
    getUsers: [User!]
    getUser(userId: String!): User
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    login(username: String!, password: String!): User
    updateUser(userId: String!, input: UpdateUserInput!): User
    deleteUser(userId: String!): User
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: String!): User 
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  input SaveBookInput {
    bookId: String!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String
  }
`;

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBookInput!) {
    saveBook(input: $input) {
      id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      id
      username
      savedBooks {
        bookId
        title
      }
    }
  }
`;

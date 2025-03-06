import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      id
      username
      email
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

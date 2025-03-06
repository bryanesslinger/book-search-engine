import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import { removeBookId } from '../utils/localStorage';
import type { Book } from '../models/Book';

const SavedBooks = () => {
  // Fetch user data using Apollo's useQuery hook
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || { savedBooks: [] };

  // Mutation hook for removing a book
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data }) {
      const removedBook = data?.removeBook; // Ensure removeBook exists

      if (!removedBook) return;

      // Read existing cache data safely
      const cachedData = cache.readQuery<{ me?: { savedBooks: Book[] } }>({ query: GET_ME }) || {};
      const savedBooks = cachedData.me?.savedBooks || []; // Use optional chaining and default value

      // Update cache after deleting the book
      cache.writeQuery({
        query: GET_ME,
        data: {
          me: {
            ...cachedData.me, // Keep existing user data
            savedBooks: savedBooks.filter((book) => book.bookId !== removedBook.bookId),
          },
        },
      });
    },
  });

  // Delete book function using Apollo
  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({ variables: { bookId } });

      // Remove book ID from local storage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Show loading while fetching data
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {userData.username}'s saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: Book) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;


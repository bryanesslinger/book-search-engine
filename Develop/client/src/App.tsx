import './App.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.PROD ? '/graphql' : 'http://localhost:3001/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;


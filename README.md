# Book Search Engine

A MERN stack application that allows users to search for books using the Google Books API and save their favorite books for future reference. This application has been refactored from a RESTful API to use GraphQL with Apollo Server.

## Features

- Search for books using the Google Books API
- View detailed information about each book including:
  - Title
  - Author(s)
  - Description
  - Cover image
  - Link to Google Books
- Save favorite books to a personal reading list
- Remove books from the reading list
- User authentication (signup/login) functionality

## Demo

The following animation shows the application's search functionality and responsive UI:

![Animation shows "star wars" typed into a search box and books about Star Wars appearing as results.](./Assets/18-mern-homework-demo-01.gif)

## Technologies Used

- **Frontend:**
  - React
  - Apollo Client
  - Bootstrap
  - TypeScript

- **Backend:**
  - Node.js
  - Express
  - Apollo Server
  - GraphQL
  - MongoDB
  - TypeScript

## Live Demo

The application is deployed and can be accessed at: [https://book-search-engine-8ymt.onrender.com/](https://book-search-engine-8ymt.onrender.com/)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run develop
   ```

## Contributing

This project is part of a coding bootcamp assignment and is not currently accepting contributions.

## License

MIT

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: [String] 
    description: String
    bookId: String 
    image: String 
    link: String 
    title: String!
  }
  
  input bookInfo {
      authors: [String]
      description: String
      bookId: String 
      image: String 
      link: String 
      title: String!
    }

  type User {
    _id: ID!
    username: String!
    email: String 
    # password: String 
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    books: [Book]
    users: [User]
  }
  type Mutation {
    login (email: String, password: String): Auth 
    addUser (username: String, email: String, password: String): Auth
    saveBook(bookInfo: bookInput): User
    removeBook(bookId: ID!): User
  }
`
module.exports = typeDefs;
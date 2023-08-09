import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser ($email: String!, $password: String! ){
    loginUser(email: $email, password: $password) {
      _id
      email 
      password
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser ($username: String!, $email: String, $password: String! ){
    addUser(username: $username, email: $email, password: $password){
      _id
      username 
      email 
      password 
    }
    # Not sure if i should pass the password 
  }
`;

export const SAVE_BOOK = gql `
  mutation saveBook ($bookInfo: bookInput!) {
    saveBook(bookInfo: $bookInfo) {
      _id 
      authors 
      description 
      bookId
      image 
      link 
      title
    }
  }
`;

export const REMOVE_BOOK = gql `
  mutation removeBook ($bookId: ID!) {
    removeBook (bookId: $bookId) {
      bookId 
    }
  }
`;
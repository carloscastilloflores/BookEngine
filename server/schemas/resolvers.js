const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    }, 
    // Get single user by either id or their username 
    user: async (parent, { username }) =>{
      return User.findOne({ username }).populate('savedBooks');
    },
    email: async (parent, { email }) => {
      return User.findOne({ email }).populate('')
    }, 
    books: async (parent, { username }) => {
      return Book.find(arams).sort({ createdAt: -1 });
    }
  },
  
  Mutation: {
    // Create User, sign a token, and send it back 
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password}); 
      const token = signToken(user);
      return { token, user }; 
    }, 
    // Login a user, sign a token, and send it back 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
// Save a book to user's savedBooks 
//1. Define an Input Type, 
//2. Update Schema 
//3. Implement the resolver 


// Remove a book from 'savedBooks
  }
}

module.exports = resolvers;





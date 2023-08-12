const { User } = require('../models');
const { signToken,  } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User
        .findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate("savedBooks");
        
        return userData;
      };
      throw new AuthenticationError("You must be logged in to access data");
      
    },
    // users: async () => {
    //   return User.find().populate('savedBooks');
    // }, 
    // // Get single user by either id or their username 
    // user: async (parent, { username }) =>{
    //   return User.findOne({ username }).populate('savedBooks');
    // },
    // email: async (parent, { email }) => {
    //   return User.findOne({ email }).populate('')
    // }, 
    // books: async (parent, { username }) => {
    //   return Book.find(params).sort({ createdAt: -1 });
    // }
  },
  
  Mutation: {
    // Create User, sign a token, and send it back 
    addUser: async (parent,  { username, email, password } ) => {
      const user = await User.create({ username, email, password }); 
      const token = signToken(user);

      return { token, user }; 
    }, 
    // Login a user, sign a token, and send it back 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw  AuthenticationError;
      }
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');;
      };

      const token = signToken(user);
      return { token, user };

    },

// Save a book to user's savedBooks 
//1. Define an Input Type, 
//2. Update Schema 
//3. Implement the resolver 

    saveBook: async (parent, { bookInfo }, context) => {
       // Check if there's an authenticated user in the context
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate( 
          // Find the user by their _id and update their data
          { _id: context.user._id },
          // $push operation adds the provided bookInfo to the savedBooks array
          { $push: {savedBooks: bookInfo } },
          // new: true ensures that the updated user is returned as the result
          { new: true},
        )
        .populate("savedBooks");
      return updatedUser;
      };
      throw new AuthenticationError("You must be logged in to save books!");
        // Return the updated user with the added book
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: {savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You have to be logged in'); 
    },
// Remove a book from 'savedBooks
  },
};

module.exports = resolvers;





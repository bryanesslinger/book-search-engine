import User from '../models/User.js';
import { UserDocument } from '../models/User.js'; 
import { signToken, AuthenticationError  } from '../services/auth.js';


interface UserArgs {
  userId: string;
}

interface CreateUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface Context {
  user?: UserDocument; 
}

const resolvers = {
  Query: {
    // Get all users (or just one based on your needs)
    getUsers: async (): Promise<UserDocument[]> => {
      return await User.find();  // Fetch all users
    },

    // Fetch a user by ID or username
    getUser: async (_parent: unknown, { userId }: UserArgs): Promise<UserDocument | null> => {
      return await User.findOne({ _id: userId });  // Find by userId
    },

    // Retrieve the current logged-in user (based on context)
    me: async (_parent: unknown, _args: unknown, context: Context): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });  // Find user by _id in context
      }
      throw new AuthenticationError('Not Authenticated');
    },
  },

  Mutation: {
    // Create a new user and sign a JWT token
    createUser: async (_parent: unknown, { input }: CreateUserArgs): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.create(input);  // Create new user
      const token = signToken(user.username, user.email, user.id);  // Sign token for the new user

      return { token, user };
    },

    // Login and get the user details along with a JWT token
    login: async (_parent: unknown, { username, password }: { username: string; password: string }): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.findOne({ username });  // Find user by username

      if (!user) {
        throw new AuthenticationError('Could not find user');
      }

      const correctPw = await user.isCorrectPassword(password);  // Check if password is correct

      if (!correctPw) {
        throw new AuthenticationError('Not Authenticated');
      }

      const token = signToken(user.username, user.email, user.id);  // Sign token for the authenticated user

      return { token, user };
    },

    // Example mutation for updating user details
    updateUser: async (_parent: unknown, { userId, input }: { userId: string, input: Partial<UserDocument> }, context: Context): Promise<UserDocument | null> => {
      if (context.user && context.user._id === userId) {
        return await User.findOneAndUpdate({ _id: userId }, input, { new: true });  // Update the user
      }
      throw new AuthenticationError('You cannot update this user');
    },

    // Example mutation for deleting a user
    deleteUser: async (_parent: unknown, { userId }: UserArgs, context: Context): Promise<UserDocument | null> => {
      if (context.user && context.user._id === userId) {
        return await User.findOneAndDelete({ _id: userId });  // Delete the user
      }
      throw new AuthenticationError('You cannot delete this user');
    },
  },
};

export default resolvers;
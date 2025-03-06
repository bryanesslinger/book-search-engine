import User from '../models/User.js';
import { UserDocument } from '../models/User.js'; 
import { signToken, AuthenticationError } from '../services/auth.js';

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

interface SaveBookArgs {
  input: {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image?: string;
    link?: string;
  };
}

interface RemoveBookArgs {
  bookId: string;
}

interface Context {
  user?: UserDocument; 
}

const resolvers = {
  Query: {
    getUsers: async (): Promise<UserDocument[]> => {
      return await User.find();
    },

    getUser: async (_parent: unknown, { userId }: UserArgs): Promise<UserDocument | null> => {
      return await User.findOne({ _id: userId });
    },

    me: async (_parent: unknown, _args: unknown, context: Context): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not Authenticated');
    },
  },

  Mutation: {
    createUser: async (_parent: unknown, { input }: CreateUserArgs): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    login: async (_parent: unknown, { username, password }: { username: string; password: string }): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Could not find user');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Not Authenticated');
      }
      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },

    updateUser: async (_parent: unknown, { userId, input }: { userId: string; input: Partial<UserDocument> }, context: Context): Promise<UserDocument | null> => {
      if (context.user && context.user._id === userId) {
        return await User.findOneAndUpdate({ _id: userId }, input, { new: true });
      }
      throw new AuthenticationError('You cannot update this user');
    },

    deleteUser: async (_parent: unknown, { userId }: UserArgs, context: Context): Promise<UserDocument | null> => {
      if (context.user && context.user._id === userId) {
        return await User.findOneAndDelete({ _id: userId });
      }
      throw new AuthenticationError('You cannot delete this user');
    },

    saveBook: async (_parent: unknown, { input }: SaveBookArgs, context: Context): Promise<UserDocument | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context): Promise<UserDocument | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
import User from '../models/User.js';
import { UserDocument } from '../models/User.js'; 

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

const resolvers = {
  Query: {
    getUsers: async (): Promise<UserDocument[]> => {
      return await User.find();
    },

    getUser: async (_parent: unknown, { userId }: UserArgs): Promise<UserDocument | null> => {
      return await User.findOne({ _id: userId });
    },

    me: async (): Promise<UserDocument | null> => {
      // Since we're not using authentication, return the first user
      return await User.findOne();
    },
  },

  Mutation: {
    createUser: async (_parent: unknown, { input }: CreateUserArgs): Promise<UserDocument> => {
      return await User.create(input);
    },

    login: async (_parent: unknown, { username, password }: { username: string; password: string }): Promise<UserDocument> => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Could not find user');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect password');
      }
      return user;
    },

    updateUser: async (_parent: unknown, { userId, input }: { userId: string; input: Partial<UserDocument> }): Promise<UserDocument | null> => {
      return await User.findOneAndUpdate({ _id: userId }, input, { new: true });
    },

    deleteUser: async (_parent: unknown, { userId }: UserArgs): Promise<UserDocument | null> => {
      return await User.findOneAndDelete({ _id: userId });
    },

    saveBook: async (_parent: unknown, { input }: SaveBookArgs): Promise<UserDocument | null> => {
      // Since we're not using authentication, we'll save the book to the first user we find
      // In a real application, you would use the authenticated user's ID
      const user = await User.findOne();
      if (!user) {
        throw new Error('No users found');
      }

      return await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs): Promise<UserDocument | null> => {
      // Since we're not using authentication, we'll remove the book from the first user we find
      const user = await User.findOne();
      if (!user) {
        throw new Error('No users found');
      }

      return await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
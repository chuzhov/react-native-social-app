import { createAsyncThunk } from '@reduxjs/toolkit';
//import { loginDB, registerDB, logOut } from '../../services/auth';
import { auth, storage } from '../../firebase/config';
import uploadAvatarToFireStorage from '../../services/uploadImageToFireStorage';
import { DEFAULT_AVATAR } from '../../config/config';

export const signUp = createAsyncThunk(
  'AUTH/signup',
  async ({ displayName, email, password, avatar }, { rejectWithValue }) => {
    try {
      // Create a new user in Firebase Auth
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      let avatarUrl = '';
      // Upload the user's avatar image to Firebase Storage
      if (avatar) {
        avatarUrl = await uploadAvatarToFireStorage(user.id, avatar);
      } else {
        avatarUrl = DEFAULT_AVATAR;
      }
      // Update the user's profile with their name and avatar URL
      await user.updateProfile({
        displayName,
        photoURL: avatarUrl,
      });
      // Return the user object
      return {
        uid: user.uid,
        email: user.email,
        name: displayName,
        avatar: avatarUrl,
      };
    } catch (error) {
      //       error.code = 'auth/network-request-failed'
      //        error.code = 'auth/email-already-in-use'
      // auth/invalid-email
      // auth/weak-password

      console.log(error);

      return rejectWithValue(error.code);
    }
  }
);

export const signIn = createAsyncThunk(
  'AUTH/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      };
    } catch (error) {
      console.dir(error);

      return rejectWithValue(error.code);
    }
  }
);

export const logOut = createAsyncThunk(
  'AUTH/signout',
  async (_, { rejectWithValue }) => {
    try {
      await logOut();
      return;
    } catch (error) {
      console.dir(error);

      return rejectWithValue(error.code);
    }
  }
);

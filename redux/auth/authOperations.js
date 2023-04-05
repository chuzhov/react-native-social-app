import { createAsyncThunk } from '@reduxjs/toolkit';
//import { loginDB, registerDB, logOut } from '../../services/auth';
import { auth, storage } from '../../firebase/config';

export const signUp = createAsyncThunk(
  'AUTH/signup',
  async ({ displayName, email, password, avatar }, { rejectWithValue }) => {
    try {
      // Create a new user in Firebase Auth
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // Upload the user's avatar image to Firebase Storage
      const avatarRef = storage.ref(`avatars/${user.uid}.jpg`);
      await avatarRef.put(avatar);
      const avatarUrl = await avatarRef.getDownloadURL();
      // Update the user's profile with their name and avatar URL
      await user.updateProfile({
        displayName,
        photoURL: avatarUrl,
      });
      // Return the user object
      console.log(user);
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.avatarUrl,
      };
    } catch (error) {
      //       error.code = 'auth/network-request-failed'
      //        error.code = 'auth/email-already-in-use'
      // auth/invalid-email
      // auth/weak-password

      console.log(error.code);
      console.log(error.message);

      return rejectWithValue(error.code);
    }
  }
);

export const signIn = createAsyncThunk(
  'AUTH/signin',
  async ({ email, password }, { rejectWithValue }) => {
    console.dir(auth);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      // const result = await auth.signIn(email, password);

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.avatarUrl,
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

//   export const currentUser = createAsyncThunk(
//     'AUTH/currentUser',
//     async (_, { rejectWithValue }) => {
//       try {
//         const result = await getCurrentUserInfo();
//         console.log('current', result);
//         return result;

//       } catch (error) {
//         console.error({error})

//         return rejectWithValue(error);
//       }
//     }
//   );

//   export const currentState = createAsyncThunk(
//     'AUTH/currentState',
//     async (_, { rejectWithValue }) => {
//       try {
//         const result = await authStateChanged();
//         // console.log('state', result);
//         return result

//       } catch (error) {
//         console.error({error})
//         return rejectWithValue(error);
//       }
//     }
//   );

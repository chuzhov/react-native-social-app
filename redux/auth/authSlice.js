import { createSlice } from '@reduxjs/toolkit';
import { currentState, signIn, logOut, signUp } from './authOperations';

const pending = state => {
  state.isUserFetching = true;
};
const rejected = (state, { payload }) => {
  console.log(payload);
  state.isUserFetching = false;
  state.isLoggedIn = false;
  state.authError = payload;
};

const initialState = {
  isLoggedIn: false,
  isUserFetching: false,
  authError: null,
  userData: {
    uid: null,
    email: null,
    name: null,
    avatar: null,
    posts: [],
  },
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    resetAuthError: state => {
      state.authError = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.userData.uid = payload.uid;
        state.userData.email = payload.email;
        state.userData.name = payload.name;
        state.userData.avatar = payload.avatar;
        state.isLoggedIn = true;
        state.isUserFetching = false;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.userData.uid = payload.uid;
        state.userData.email = payload.email;
        state.userData.name = payload.displayName;
        state.userData.avatar = payload.photoURL;
        state.isLoggedIn = true;
        state.isUserFetching = false;
      })

      .addCase(logOut.fulfilled, () => ({ ...initialState }))
      .addCase(signUp.pending, pending)
      .addCase(signIn.pending, pending)

      .addCase(signUp.rejected, rejected)
      .addCase(signIn.rejected, rejected),
});

export default authSlice.reducer;
export const { resetAuthError } = authSlice.actions;

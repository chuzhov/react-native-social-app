import { createSlice } from '@reduxjs/toolkit';
import {
  addPost,
  addComments,
  getPosts,
  getComments,
  addLike,
  removeLike,
  getUsersPosts,
} from './coreOperations';

const initialState = {
  isDataFetching: false,
  dbError: null,
};

const pending = state => {
  state.isDataFetching = true;
};
const rejected = () => {
  initialState;
};

export const coreSlice = createSlice({
  name: 'DB',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.isDataFetching = false;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isDataFetching = false;
      })
      .addCase(getUsersPosts.fulfilled, (state, { payload }) => {
        state.isDataFetching = false;
      })
      .addCase(addComments.fulfilled, state => {
        state.isDataFetching = false;
      })
      .addCase(getComments.fulfilled, state => {
        state.isDataFetching = false;
      })
      .addCase(addLike.fulfilled, state => {
        state.isDataFetching = false;
      })
      .addCase(removeLike.fulfilled, state => {
        state.isDataFetching = false;
      })
      .addCase(addPost.pending, pending)
      .addCase(getPosts.pending, pending)
      .addCase(getUsersPosts.pending, pending)
      .addCase(addComments.pending, pending)
      .addCase(getComments.pending, pending)
      .addCase(addLike.pending, pending)
      .addCase(removeLike.pending, pending)
      .addCase(addPost.rejected, rejected)
      .addCase(getPosts.rejected, rejected)
      .addCase(getUsersPosts.rejected, rejected)
      .addCase(addComments.rejected, rejected)
      .addCase(getComments.rejected, rejected)
      .addCase(addLike.rejected, rejected)
      .addCase(removeLike.rejected, rejected),
});

export default coreSlice.reducer;

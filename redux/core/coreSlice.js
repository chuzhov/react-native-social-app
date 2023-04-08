import { createSlice } from '@reduxjs/toolkit';
import {
  addPost,
  addComment,
  getPosts,
  addLike,
  removeLike,
  getCurrentUsersPosts,
} from './coreOperations';

const initialState = {
  heavyDataFetching: false,
  lightDataFetching: false,
  posts: [],
  dbError: null,
};

const heavyPending = state => {
  state.heavyDataFetching = true;
};
const lightPending = state => {
  state.lightDataFetching = true;
};

const rejected = (state, { payload }) => {
  state.dbError = payload;
  state.heavyDataFetching = false;
  state.lightDataFetching = false;
};

export const coreSlice = createSlice({
  name: 'DB',
  initialState,
  reducers: {
    resetCoreError: state => {
      state.dbError = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.lightDataFetching = false;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.heavyDataFetching = false;
      })
      .addCase(getCurrentUsersPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.heavyDataFetching = false;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const { id, comments } = payload.postData;
        state.posts.find(post => post.id === id).comments = comments;
        state.lightDataFetching = false;
      })

      .addCase(addLike.fulfilled, (state, { payload }) => {
        const { postId, likes } = payload;
        state.posts.find(post => post.id === postId).likes = likes;
        state.lightDataFetching = false;
      })
      .addCase(removeLike.fulfilled, (state, { payload }) => {
        const { postId, likes } = payload;
        state.posts.find(post => post.id === postId).likes = likes;
        state.lightDataFetching = false;
      })
      .addCase(addPost.pending, lightPending)
      .addCase(getPosts.pending, heavyPending)
      .addCase(getCurrentUsersPosts.pending, heavyPending)
      .addCase(addComment.pending, lightPending)
      .addCase(addLike.pending, lightPending)
      .addCase(removeLike.pending, lightPending)
      .addCase(addPost.rejected, rejected)
      .addCase(getPosts.rejected, rejected)
      .addCase(getCurrentUsersPosts.rejected, rejected)
      .addCase(addComment.rejected, rejected)
      .addCase(addLike.rejected, rejected)
      .addCase(removeLike.rejected, rejected),
});

export default coreSlice.reducer;
export const { resetCoreError } = coreSlice.actions;

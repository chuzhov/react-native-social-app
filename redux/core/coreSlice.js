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
  isDataFetching: false,
  posts: [],
  dbError: null,
};

const pending = state => {
  state.isDataFetching = true;
};
const rejected = (state, { payload }) => {
  state.dbError = payload;
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
        state.isDataFetching = false;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.isDataFetching = false;
      })
      .addCase(getCurrentUsersPosts.fulfilled, (state, { payload }) => {
        state.isDataFetching = false;
        state.posts = payload;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const { id, comments } = payload.postData;
        state.posts.find(post => post.id === id).comments = comments;
        state.isDataFetching = false;
      })

      .addCase(addLike.fulfilled, (state, { payload }) => {
        const { postId, likes } = payload;
        state.posts.find(post => post.id === postId).likes = likes;
        state.isDataFetching = false;
      })
      .addCase(removeLike.fulfilled, (state, { payload }) => {
        const { postId, likes } = payload;
        state.posts.find(post => post.id === postId).likes = likes;
        state.isDataFetching = false;
      })
      .addCase(addPost.pending, pending)
      .addCase(getPosts.pending, pending)
      .addCase(getCurrentUsersPosts.pending, pending)
      .addCase(addComment.pending, pending)
      .addCase(addLike.pending, pending)
      .addCase(removeLike.pending, pending)
      .addCase(addPost.rejected, rejected)
      .addCase(getPosts.rejected, rejected)
      .addCase(getCurrentUsersPosts.rejected, rejected)
      .addCase(addComment.rejected, rejected)
      .addCase(addLike.rejected, rejected)
      .addCase(removeLike.rejected, rejected),
});

export default coreSlice.reducer;
export const { resetCoreError } = coreSlice.actions;

import { createAsyncThunk } from '@reduxjs/toolkit';

import uploadImageToFireStorage from '../../services/uploadImageToFireStorage';
import { getSpecificUsersPostsFromDB } from '../../services/getSpecificUsersPosts';
import addCommentToPostInDB from '../../services/addCommentToPostInBD';
import addPostToDB from '../../services/addPostToDB';
import addUsersLikeToDB from '../../services/addUsersLikeToDB';
import removeUsersLikeFromDB from '../../services/removeUsersLikeFromDB';
import getAllPostsFromDB from '../../services/getAllPostsFromDB';

export const addPost = createAsyncThunk(
  'DB/addPost',
  async (data, { rejectWithValue }) => {
    try {
      const {
        userId,
        userName,
        userAvatar,
        image,
        location,
        coordinates,
        title,
      } = data;

      const imageUrl = await uploadImageToFireStorage(userId, image);

      const newPost = {
        userId,
        userName,
        userAvatar,
        title,
        imageUrl,
        location,
        coordinates,
        comments: [],
        likes: [],
        createdAt: new Date(),
      };
      return await addPostToDB(newPost);
    } catch (error) {
      console.dir(error);

      return rejectWithValue(error.code);
    }
  }
);

export const getPosts = createAsyncThunk(
  'db/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllPostsFromDB();

      return result;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const getCurrentUsersPosts = createAsyncThunk(
  'DB/getCurrentUsersPosts',
  async (data, { rejectWithValue }) => {
    const { userId } = data;
    try {
      const result = await getSpecificUsersPostsFromDB({
        userId: userId,
      });

      return result;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const addComment = createAsyncThunk(
  'DB/addComment',
  async (data, { rejectWithValue }) => {
    const { postId, commentData } = data;
    try {
      const updatedPost = await addCommentToPostInDB({ postId, commentData });
      return updatedPost;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const addLike = createAsyncThunk(
  'DB/addLike',
  async (data, { rejectWithValue }) => {
    const { postId, userId } = data;
    try {
      const likes = await addUsersLikeToDB({ postId, userId });
      return { postId, likes };
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const removeLike = createAsyncThunk(
  'DB/removeLike',
  async (data, { rejectWithValue }) => {
    const { postId, userId } = data;
    try {
      const likes = await removeUsersLikeFromDB({ postId, userId });
      return { postId, likes };
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { storage, db } from '../../firebase/config';
// import {
//   addPostToDB,
//   addCommentToPostInDB,
//   getAllPostsFromDB,
//   getAllCommentsToPostFromDB,
//   addLikeToPostInDB,
//   removeLikeToPostInDB,
//   getUsersPostsFromDB,
// } from '../../services/db';

import uploadImageToFireStorage from '../../services/uploadImageToFireStorage';

export const addPost = createAsyncThunk(
  'DB/addPost',
  async (data, { rejectWithValue }) => {
    console.dir(data);
    try {
      const { userId, image, location, coordinates, title } = data;

      const imageUrl = await uploadImageToFireStorage(userId, image);

      const newPost = {
        userId,
        title,
        imageUrl,
        location,
        coordinates,
        comments: [],
        likes: [],
        createdAt: new Date(),
      };
      const postsCollection = db.collection('posts');
      const newPostRef = await postsCollection.add(newPost);

      return newPostRef.id;
    } catch (error) {
      console.dir(error);

      return rejectWithValue(error.code);
    }
  }
);

export const getPosts = createAsyncThunk(
  'db/getPosts',
  async (setPosts, { rejectWithValue }) => {
    try {
      const result = await getAllPostsFromDB({ setPosts: setPosts });
      return result;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const getUsersPosts = createAsyncThunk(
  'db/getUsersPosts',
  async (data, { rejectWithValue }) => {
    const { userId, setUsersPosts } = data;
    try {
      const result = await getUsersPostsFromDB({
        userId: userId,
        setUsersPosts: setUsersPosts,
      });
      return result;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const addComments = createAsyncThunk(
  'db/addComment',
  async (data, { rejectWithValue }) => {
    const { postId, commentData } = data;
    try {
      await addCommentToPostInDB({ postId, commentData: commentData });
      return;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const getComments = createAsyncThunk(
  'db/getComments',
  async (data, { rejectWithValue }) => {
    const { postId, setComments } = data;
    try {
      await getAllCommentsToPostFromDB({
        postId: postId,
        setComments: setComments,
      });
      return;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const addLike = createAsyncThunk(
  'db/addLike',
  async (data, { rejectWithValue }) => {
    const { postId } = data;
    try {
      await addLikeToPostInDB({ postId: postId });
      return;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

export const removeLike = createAsyncThunk(
  'db/removeLike',
  async (data, { rejectWithValue }) => {
    const { postId } = data;
    try {
      await removeLikeToPostInDB({ postId: postId });
      return;
    } catch (error) {
      console.dir({ error });

      return rejectWithValue(error.code);
    }
  }
);

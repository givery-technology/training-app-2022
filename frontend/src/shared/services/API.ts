import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello, PostList, Post, APIListResponse, User } from '../models';

const API_ENDPOINT_PATH =
  process.env.REACT_APP_API_ENDPOINT_PATH ?? 'http://localhost:9000';

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, { ...init, credentials: 'include', mode: 'cors' }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  });

  return response.status === 204 ? await response.text() : await response.json();
};

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/hello`);
});

export const getPostList = createAsyncThunk<APIListResponse<PostList>>('getPostList', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/posts`);
});

export const getPost = createAsyncThunk<Post, number>('getPost', async (postId: number) => {
  return await customFetch(`${API_ENDPOINT_PATH}/posts/${postId}`);
});

export const signIn = createAsyncThunk<User, { username: string; password: string }>('signIn', async (body) => {
  return await customFetch(`${API_ENDPOINT_PATH}/signin`, { method: 'post', body: JSON.stringify(body) });
});

export const signOut = createAsyncThunk('signOut', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/signout`, { method: 'post' });
});

export const getUser = createAsyncThunk<User>('getUser', async () => {
  return await customFetch(`${API_ENDPOINT_PATH}/user`);
});

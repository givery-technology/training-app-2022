import { createSlice } from '@reduxjs/toolkit';

import { Post, PostList } from '../models';
import { APIService } from '../services';

export type PostState = {
  posts: PostList[];
  post?: Post;
  submitting: boolean;
};

export const initialState: PostState = {
  posts: [],
  submitting: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.getPostList.fulfilled, (state, action) => {
      state.posts = action.payload.list;
    });

    builder.addCase(APIService.getPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });

    builder.addCase(APIService.createPost.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.createPost.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.createPost.rejected, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updatePost.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.updatePost.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updatePost.rejected, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deletePost.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.deletePost.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deletePost.rejected, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.createComment.fulfilled, (state, action) => {
      state.post?.comments.push(action.payload);
    });

    builder.addCase(APIService.updateComment.fulfilled, (state, action) => {
      if (state.post) {
        state.post.comments = state.post.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        );
      }
    });

    builder.addCase(APIService.deleteComment.fulfilled, (state, action) => {
      const commentId = action.meta.arg;
      if (state.post) {
        state.post.comments = state.post?.comments.filter((comment) => {
          return comment.id !== commentId;
        });
      }
    });
  },
});

export default postSlice.reducer;

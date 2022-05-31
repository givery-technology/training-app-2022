import { createSlice } from '@reduxjs/toolkit';
import { APIService } from '../services';

export type CommentState = {
  submitting: boolean;
};

export const initialState: CommentState = { submitting: false };

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.createComment.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.createComment.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.createComment.rejected, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updateComment.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.updateComment.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.updateComment.rejected, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deleteComment.pending, (state, action) => {
      state.submitting = true;
    });

    builder.addCase(APIService.deleteComment.fulfilled, (state, action) => {
      state.submitting = false;
    });

    builder.addCase(APIService.deleteComment.rejected, (state, action) => {
      state.submitting = false;
    });
  },
});

export default commentSlice.reducer;

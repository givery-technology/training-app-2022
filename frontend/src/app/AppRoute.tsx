import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  PostList,
  PostDetail,
  PostNew,
  PostEdit,
  Private,
  SignIn,
} from '../features';
import { PriveteRoute } from './partials';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route
        path="/posts/new"
        element={
          <PriveteRoute>
            <PostNew />
          </PriveteRoute>
        }
      />
      <Route
        path="/posts/:postId/edit"
        element={
          <PriveteRoute>
            <PostEdit />
          </PriveteRoute>
        }
      />
      <Route
        path="/private"
        element={
          <PriveteRoute>
            <Private />
          </PriveteRoute>
        }
      />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

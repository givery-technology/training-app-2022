import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PostList, PostDetail, SignIn, Private } from '../features';
import { PriveteRoute } from './partials';

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/private"
        element={
          <PriveteRoute>
            <Private />
          </PriveteRoute>
        }
      />
    </Routes>
  );
};

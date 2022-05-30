import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSeletor } from '../../shared/hooks';

export type PriveteRouteProps = {
  children?: React.ReactElement;
};

export function PriveteRoute({ children }: PriveteRouteProps) {
  const { user } = useAppSeletor((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
}

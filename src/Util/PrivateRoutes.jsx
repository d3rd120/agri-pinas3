import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getToken } from './Common';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return getToken() ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../../components/Auth/AuthProvider';

const AppRoute = ({ component: Component, layout: Layout, ...routeProps }) => {
  if (routeProps.auth && (routeProps.authRequired && !routeProps.auth.isAuth)) {
    return <Redirect from={routeProps.path} to={`/login?redirect=${routeProps.path}`} />;
  }

  if (routeProps.redirect) {
    return <Redirect from={routeProps.path} to={routeProps.to} />;
  }
  return (
    <Route
      {...routeProps}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default withAuth(AppRoute);

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { UserConsumer } from './LoginContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // console.log(auth);
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  function renderRoute(props, token) {
    if (token) {
      const decd = parseJwt(token);

      if (decd.exp * 1000 >= Date.now()) {
        return <Component {...props} />;
      }
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    );
  }
  return (
    <UserConsumer>
      {({ token }) => (
        <Route {...rest} render={(props) => renderRoute(props, token)} />
      )}
    </UserConsumer>
  );
};

ProtectedRoute.propTypes = {
  // auth: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default withRouter(ProtectedRoute);

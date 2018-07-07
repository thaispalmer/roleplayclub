import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

const PREFIX = '_rc_';

class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.login = (accessToken, user, remember) => {
      const encodedToken = btoa(accessToken);
      const encodedUser = btoa(JSON.stringify(user));
      if (remember) {
        localStorage.setItem(`${PREFIX}at`, encodedToken);
        localStorage.setItem(`${PREFIX}us`, encodedUser);
      } else {
        sessionStorage.setItem(`${PREFIX}at`, encodedToken);
        sessionStorage.setItem(`${PREFIX}us`, encodedUser);
      }
      this.setState({ isAuth: true });
    };

    this.logout = () => {
      localStorage.removeItem(`${PREFIX}at`);
      localStorage.removeItem(`${PREFIX}us`);
      sessionStorage.removeItem(`${PREFIX}at`);
      sessionStorage.removeItem(`${PREFIX}us`);
      this.setState({ isAuth: false });
    };

    this.getAccessToken = () => {
      const raw = localStorage.getItem(`${PREFIX}at`) || sessionStorage.getItem(`${PREFIX}at`);
      return raw ? atob(raw) : null;
    };

    this.getUser = () => {
      const raw = localStorage.getItem(`${PREFIX}us`) || sessionStorage.getItem(`${PREFIX}us`);
      return raw ? JSON.parse(atob(raw)) : null;
    };

    this.state = {
      isAuth: !!this.getAccessToken(),
    };
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AuthProvider.defaultProps = {
  children: null,
};

const AuthConsumer = AuthContext.Consumer;

const withAuth = (ChildComponent) => {
  const AuthComponent = props => (
    <AuthContext.Consumer>
      {value => <ChildComponent {...props} auth={value} />}
    </AuthContext.Consumer>
  );
  return AuthComponent;
};

const AuthProps = PropTypes.shape({
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
});

export { AuthProvider, AuthConsumer, withAuth, AuthProps };
export default AuthProvider;

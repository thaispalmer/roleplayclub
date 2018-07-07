import LoginForm from '../pages/Login/LoginForm';
import ForgotPasswordForm from '../pages/ForgotPassword/ForgotPasswordForm';
import LogoutPage from '../pages/Login/LogoutPage';
import SignUpForm from '../pages/Login/SignUpForm';

/**
 * Define routes and sidebar links at the same time.
 * Note that only items with 'icon' property and
 * without 'redirect' property will be rendered on sidebar.
 * @type {Object[]}
 */
const cleanRoutes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpForm,
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPasswordForm,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage,
  },
];

export default cleanRoutes;

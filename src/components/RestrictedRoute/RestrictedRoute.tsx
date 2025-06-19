import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { Navigate } from 'react-router-dom';
import type { RestrictedRouteProps } from './restrictedRoute.type.js';

const RestrictedRoute = ({
  component,
  redirectTo = '/',
}: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;

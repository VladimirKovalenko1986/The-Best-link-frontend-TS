import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.ts';
import { Navigate } from 'react-router-dom';
import type { PrivateRouteProps } from './privateRoute.type.ts';

const PrivateRoute = ({ component, redirectTo = '/' }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

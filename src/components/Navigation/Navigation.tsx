import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectLoadingResetPassword,
} from '../../redux/auth/selectors.ts';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const resetPassword = useSelector(selectLoadingResetPassword);

  return (
    <nav>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/links" className={getNavLinkClass}>
          Links
        </NavLink>
      )}
      {resetPassword && (
        <NavLink to="/reset-password" className={getNavLinkClass}>
          Reset password
        </NavLink>
      )}
    </nav>
  );
}

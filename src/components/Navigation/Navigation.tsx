import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectLoadingResetPassword,
} from '../../redux/auth/selectors.ts';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getNavLinkClass: NavLinkProps['className'] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
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
};

export default Navigation;

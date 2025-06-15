import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthNav.module.css';

const getNavLinkClass: NavLinkProps['className'] = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink to="/registration" className={getNavLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={getNavLinkClass}>
        LogIn
      </NavLink>
    </div>
  );
};

export default AuthNav;

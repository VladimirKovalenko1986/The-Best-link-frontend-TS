import { useDispatch, useSelector } from 'react-redux';
import css from './AppBar.module.css';
import Navigation from '../Navigation/Navigation.tsx';
import UserMenu from '../UserMenu/UserMenu.tsx';
import AuthNav from '../AuthNav/AuthNav.tsx';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.tsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.ts';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations.ts';
import type { AppDispatch } from '../../redux/types.ts';

export default function AppBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <header className={css.conteiner}>
      <Navigation />
      <ThemeSwitcher />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}

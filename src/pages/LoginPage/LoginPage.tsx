import TitleLink from '../../components/TitleLink/TitleLink.tsx';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import DiscussLoading from '../../components/DiscussLoading/DiscussLoading.tsx';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { fetchGoogleOAuthUrl } from '../../redux/auth/operations.ts';
import RegistrationGoogle from '../../components/RegistrationGoogle/RegistrationGoogle.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGoogleOAuthUrl());
  }, [dispatch]);

  return (
    <div>
      <TitleLink text="Sign in to your account! " />
      <LoginForm />
      <RegistrationGoogle />
      <div className={css.conteiner}>
        <Link to="send-email-reset-password" className={css.link}>
          Click if you not remeber password!
        </Link>
      </div>
      <Suspense fallback={<DiscussLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LoginPage;

import css from './App.module.css';
import { lazy } from 'react';
import Layout from '../Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors.ts';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.js';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import SendEmailResetPassword from '../SendEmailResetPassword/SendEmailResetPassword.tsx';
import { useEffect } from 'react';
import { selectTheme } from '../../redux/theme/selectors.ts';
import DiscussLoading from '../DiscussLoading/DiscussLoading.tsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.tsx'));
const GoogleRedirectPage = lazy(
  () => import('../../pages/GoogleRedirectPage/GoogleRedirectPage.tsx')
);
const LinksPage = lazy(() => import('../../pages/LinksPage/LinksPage.tsx'));
const RegisterPage = lazy(
  () => import('../../pages/RegisterPage/RegisterPage.tsx')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.tsx'));
const PageResetPassword = lazy(
  () => import('../../pages/PageResetPassword/PageResetPassword.tsx')
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage.tsx')
);

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.classList.remove('light', 'dark'); //delete class theam
    document.body.classList.add(theme); //add class theam
  }, [theme]);

  return (
    <div className={css.conteiner}>
      <Layout>
        <>
          {isRefreshing ? (
            <DiscussLoading />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/links"
                element={
                  <PrivateRoute component={<LinksPage />} redirectTo="/login" />
                }
              />
              <Route
                path="/registration"
                element={
                  <RestrictedRoute
                    component={<RegisterPage />}
                    redirectTo="/login"
                  />
                }
              />

              <Route
                path="/auth/google-redirect"
                element={<GoogleRedirectPage />}
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    component={<LoginPage />}
                    redirectTo="/links"
                  />
                }
              >
                <Route
                  path="send-email-reset-password"
                  element={<SendEmailResetPassword />}
                />
              </Route>

              <Route path="/reset-password" element={<PageResetPassword />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </>
      </Layout>
    </div>
  );
}

export default App;

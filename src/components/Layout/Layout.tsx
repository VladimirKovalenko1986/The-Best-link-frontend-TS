import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscussLoading from '../DiscussLoading/DiscussLoading.tsx';
import AppBar from '../AppBar/AppBar.tsx';
import type { FC, ReactNode } from 'react';
import css from './Layout.module.css';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={css.conteiner}>
      <AppBar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<DiscussLoading />}>{children}</Suspense>
    </div>
  );
};

export default Layout;

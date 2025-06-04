import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscussLoading from '../DiscussLoading/DiscussLoading.tsx';
import AppBar from '../AppBar/AppBar.tsx';
import css from './Layout.module.css';

export default function Layout({ children }) {
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
}

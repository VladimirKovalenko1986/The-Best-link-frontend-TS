import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../redux/auth/operations.ts';
import { toast } from 'react-toastify';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors.ts';
import ProgressBarLoading from '../../components/ProgressBarLoading/ProgressBarLoading.tsx';

export default function GoogleRedirectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const hasRequested = useRef(false); // Запам'ятовуємо, чи вже був запит

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      toast.error('Google OAuth code not found in URL.');
      navigate('/login');
      return;
    }

    if (isLoggedIn) {
      navigate('/links');
      return;
    }

    if (!hasRequested.current) {
      hasRequested.current = true; // Запобігаємо повторному виклику
      dispatch(loginWithGoogle(code))
        .unwrap()
        .then(res => {
          console.log(res);
          toast.success('Google login user');
        })
        .catch(error => {
          toast.error(`Google login ${error}`);
          navigate('/login');
        });
    }
  }, [dispatch, navigate, searchParams, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && user.email) {
      navigate('/links');
    }
  }, [isLoggedIn, user, navigate]);

  return <ProgressBarLoading />;
}

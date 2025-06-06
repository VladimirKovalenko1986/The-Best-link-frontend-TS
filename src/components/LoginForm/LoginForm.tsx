import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { selectLoadingLogin, selectError } from '../../redux/auth/selectors.ts';
import { logIn } from '../../redux/auth/operations.ts';
import HourglassLoading from '../HourglassLoading/HourglassLoading.tsx';
import css from './LoginForm.module.css';

export default function LoginForm() {
  const loadingLogin = useSelector(selectLoadingLogin);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email!').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success('You have successfully login!');
        actions.resetForm();
      })
      .catch(err => {
        if (err === 'Request failed with status code 401') {
          toast.error('Enter password or email is not correct!');
        } else {
          toast.error(`A registration error has occurred: ${err}`);
        }
      });
  };

  const emailId = useId();
  const passwordId = useId();

  return (
    <div>
      {loadingLogin && <HourglassLoading />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form}>
          <div className={css.conteiner}>
            <label className={css.label} htmlFor={emailId}>
              Email
            </label>
            <Field
              className={css.input}
              type="email"
              name="email"
              id={emailId}
              autoComplete="off"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.conteiner}>
            <label className={css.label} htmlFor={passwordId}>
              password
            </label>
            <Field
              className={css.input}
              type="password"
              name="password"
              id={passwordId}
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>
          {error && (
            <p className={css.error}>
              Ooops! There was an error! Please reload!
            </p>
          )}
          <button type="submit" className={css.btn}>
            {loadingLogin ? 'Loading in user...' : 'Sign in user'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

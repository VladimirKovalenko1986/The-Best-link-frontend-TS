import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { selectLoadingLogin, selectError } from '../../redux/auth/selectors.ts';
import { logIn } from '../../redux/auth/operations.ts';
import HourglassLoading from '../HourglassLoading/HourglassLoading.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import type { FormikHelpers } from 'formik';
import type { LoginFormValues } from './liginForm.type.ts';
import { userSchema } from './liginForm.type.ts';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const loadingLogin = useSelector(selectLoadingLogin);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
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
};

export default LoginForm;

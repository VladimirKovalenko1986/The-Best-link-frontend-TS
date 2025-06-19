import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { selectLoadingResetPassword } from '../../redux/auth/selectors.ts';
import { resetPassword } from '../../redux/auth/operations.ts';
import { useId } from 'react';
import TriangleLoading from '../../components/TriangleLoading/TriangleLoading.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import { passwordSchema } from './pageResetPasswortd.type.ts';
import type { PasswordResetValue } from './pageResetPasswortd.type.ts';
import type { FormikHelpers } from 'formik';
import css from './PageResetPassword.module.css';

const PageResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch<AppDispatch>();
  const passwordId = useId();
  const loadingResetPassword = useSelector(selectLoadingResetPassword);
  const navigate = useNavigate();

  const initialValues: PasswordResetValue = {
    password: '',
  };

  const handleSubmit = (
    values: PasswordResetValue,
    actions: FormikHelpers<PasswordResetValue>
  ) => {
    dispatch(resetPassword({ token, password: values.password }))
      .unwrap()
      .then(() => {
        toast.success('You have password reset!');
        actions.resetForm();
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        toast.error(`A registration error has occurred: ${err}`);
      });
  };

  return (
    <div>
      {loadingResetPassword && <TriangleLoading />}
      <Formik
        initialValues={initialValues}
        validationSchema={passwordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.conteiner}>
              <label className={css.label} htmlFor={passwordId}>
                Please enter new password
              </label>
              <div>
                <Field
                  className={css.input}
                  name="password"
                  type="password"
                  id={passwordId}
                />
                <button
                  className={css.btn}
                  type="submit"
                  disabled={loadingResetPassword || isSubmitting}
                >
                  {loadingResetPassword ? 'Sending...' : 'Send'}
                </button>
                <ErrorMessage
                  className={css.error}
                  name="password"
                  component="div"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PageResetPassword;

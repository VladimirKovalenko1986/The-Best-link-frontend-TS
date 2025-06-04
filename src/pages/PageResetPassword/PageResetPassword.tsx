import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { selectLoadingResetPassword } from '../../redux/auth/selector.ts';
import { resetPassword } from '../../redux/auth/operations.ts';
import { useId } from 'react';
import TriangleLoading from '../../components/TriangleLoading/TriangleLoading.tsx';
import css from './PageResetPassword.module.css';

export default function PageResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  const passwordId = useId();
  const loadingResetPassword = useSelector(selectLoadingResetPassword);
  const navigate = useNavigate();

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const initialValues = {
    password: '',
  };

  const handleSubmit = (values, actions) => {
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
}

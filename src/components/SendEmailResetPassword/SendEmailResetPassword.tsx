import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingResetPassword } from '../../redux/auth/selector.ts';
import { sendEmailResetPassword } from '../../redux/auth/operations.ts';
import TriangleLoading from '../TriangleLoading/TriangleLoading.tsx';
import css from './SedEmailResetPassword.module.css';

export default function SendEmailResetPassword() {
  const dispatch = useDispatch();
  const loadingResetPassword = useSelector(selectLoadingResetPassword);

  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email!').required('Required'),
  });

  const initialValues = {
    email: '',
  };

  const emailId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(sendEmailResetPassword({ email: values.email }))
      .unwrap()
      .then(() => {
        toast.success('On the your mail send message from reset password!');
        actions.resetForm();
      })
      .catch(err => {
        toast.error(`A registration error has occurred: ${err}`);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={emailSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={css.conteiner}>
            <label className={css.label} htmlFor={emailId}>
              Email
            </label>
            <div>
              <Field
                className={css.input}
                name="email"
                type="email"
                id={emailId}
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
                name="email"
                component="div"
              />
            </div>
          </div>
          {loadingResetPassword && <TriangleLoading />}
        </Form>
      )}
    </Formik>
  );
}

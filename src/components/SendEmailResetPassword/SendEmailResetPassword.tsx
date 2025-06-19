import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingResetPassword } from '../../redux/auth/selectors.ts';
import { sendEmailResetPassword } from '../../redux/auth/operations.ts';
import TriangleLoading from '../TriangleLoading/TriangleLoading.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import type { FormikHelpers } from 'formik';
import { emailSchema } from './sendEmailResetPassword.type.ts';
import type { EmailResetValue } from './sendEmailResetPassword.type.ts';
import css from './SedEmailResetPassword.module.css';

const SendEmailResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingResetPassword = useSelector(selectLoadingResetPassword);

  const initialValues: EmailResetValue = {
    email: '',
  };

  const emailId = useId();

  const handleSubmit = (
    values: EmailResetValue,
    actions: FormikHelpers<EmailResetValue>
  ) => {
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
};

export default SendEmailResetPassword;

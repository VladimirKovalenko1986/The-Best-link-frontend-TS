import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useId, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration, logIn } from '../../redux/auth/operations.ts';
import {
  selectLoadingRegistration,
  selectError,
} from '../../redux/auth/selectors.ts';
import type { AppDispatch } from '../../redux/types.ts';
import type { FormikHelpers } from 'formik';
import { userSchemaRegistration } from './registration.type.ts';
import type { RegistrationFormValue } from './registration.type.ts';
import FallingLinesLoading from '../FallingLinesLoading/FallingLinesLoading.tsx';
import type { UserDto } from '../../redux/auth/auth.type.ts';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const loadingRegistration = useSelector(selectLoadingRegistration);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const initialValues: RegistrationFormValue = {
    name: '',
    email: '',
    password: '',
    photo: null,
  };

  const handleSubmit = (
    values: RegistrationFormValue,
    actions: FormikHelpers<RegistrationFormValue>
  ): void => {
    const { photo, ...rest } = values;
    const payload: UserDto = {
      ...rest,
      photo:
        typeof photo === 'string' || photo instanceof File ? photo : undefined,
    };

    dispatch(registration(payload))
      .unwrap()
      .then(() => {
        // після реєстрації — логін
        dispatch(logIn({ email: values.email, password: values.password }))
          .unwrap()
          .then(() => {
            toast.success('You have successfully registered and logged in!');
            actions.resetForm();
            navigate('/links');
          })
          .catch(() => {
            toast.error('Registration succeeded but login failed');
            navigate('/login'); // запасний варіант
          });
      })
      .catch(err => {
        if (err === 'Request failed with status code 409') {
          toast.error('User already registered!');
        } else {
          toast.error(`A registration error has occurred: ${err}`);
        }
      });
  };

  const userNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const photoId = useId();

  return (
    <div>
      {loadingRegistration && <FallingLinesLoading />}
      <Formik
        initialValues={initialValues}
        validationSchema={userSchemaRegistration}
        onSubmit={handleSubmit}
      >
        {/* Використовуємо render props для поля фото */}
        {({ setFieldValue }) => (
          <Form className={css.form}>
            {/* Name */}
            <div className={css.conteiner}>
              <label className={css.label} htmlFor={userNameId}>
                Name
              </label>
              <Field
                className={css.input}
                id={userNameId}
                name="name"
                type="text"
              />
              <ErrorMessage className={css.error} name="name" component="div" />
            </div>
            {/* Email */}
            <div className={css.conteiner}>
              <label className={css.label} htmlFor={emailId}>
                Email
              </label>
              <Field
                className={css.input}
                id={emailId}
                name="email"
                type="email"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="div"
              />
            </div>
            {/* Password */}
            <div className={css.conteiner}>
              <label className={css.label} htmlFor={passwordId}>
                Password
              </label>
              <Field
                className={css.input}
                id={passwordId}
                name="password"
                type="password"
              />
              <ErrorMessage
                className={css.error}
                name="password"
                component="div"
              />
            </div>
            {/* Photo (файл) */}
            <div className={css.conteiner}>
              <label className={css.label} htmlFor={photoId}>
                Photo
              </label>
              <input
                id={photoId}
                name="photo"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={event => {
                  const files = event.currentTarget.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setFieldValue('photo', file);
                  }
                }}
              />
            </div>
            {error && (
              <p className={css.error}>
                Ooops! There was an error! Please reload!
              </p>
            )}
            <button className={css.btn} type="submit">
              {loadingRegistration ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;

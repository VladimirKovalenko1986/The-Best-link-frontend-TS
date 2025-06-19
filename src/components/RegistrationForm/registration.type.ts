import * as Yup from 'yup';
import type { InferType } from 'yup';

export const userSchemaRegistration = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  photo: Yup.string().notRequired(),
});

export type RegistrationFormValue = InferType<typeof userSchemaRegistration>;

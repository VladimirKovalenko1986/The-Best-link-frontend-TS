import * as Yup from 'yup';
import type { InferType } from 'yup';

export const userSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export type LoginFormValues = InferType<typeof userSchema>;

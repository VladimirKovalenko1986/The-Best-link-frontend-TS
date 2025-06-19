import * as Yup from 'yup';
import type { InferType } from 'yup';

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export type PasswordResetValue = InferType<typeof passwordSchema>;

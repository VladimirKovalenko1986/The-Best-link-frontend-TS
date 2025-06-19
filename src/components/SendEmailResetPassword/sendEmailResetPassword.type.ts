import * as Yup from 'yup';
import type { InferType } from 'yup';

export const emailSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
});

export type EmailResetValue = InferType<typeof emailSchema>;

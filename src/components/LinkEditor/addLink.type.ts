import * as Yup from 'yup';
import type { InferType } from 'yup';

export const addLinkSchema = Yup.object().shape({
  nameType: Yup.string()
    .oneOf([
      'HTML&CSS',
      'JS',
      'React',
      'TS',
      'Node.js',
      'Video/HTML&CSS',
      'Video/JS',
      'Video/React',
      'Video/TS',
      'Video/Node.js',
    ])
    .required('Required'),

  link: Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),

  nameLink: Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),

  textLink: Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),

  poster: Yup.mixed<File>().notRequired(),
});

export type AddLinkFormValues = InferType<typeof addLinkSchema>;

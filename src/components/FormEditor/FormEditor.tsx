import TitleLink from '../TitleLink/TitleLink.tsx';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  selectModalLinkId,
  selectLoadingEditLink,
  selectError,
  selectLinks,
} from '../../redux/links/selectors.ts';
import RotatingSquareLoading from '../RotatingSquareLoading/RotatingSquareLoading.tsx';
import { editLink } from '../../redux/links/operations.ts';
import { closeModal } from '../../redux/links/slice.ts';
import * as Yup from 'yup';
import { useId, useRef, useMemo } from 'react';
import css from './FormEditor.module.css';

export default function FormEditor() {
  const loadingEdit = useSelector(selectLoadingEditLink);
  const error = useSelector(selectError);
  const id = useSelector(selectModalLinkId);
  const links = useSelector(selectLinks);
  const dispatch = useDispatch();
  const fileInputRef = useRef('');

  const handleClose = () => {
    dispatch(closeModal());
  };

  // Знаходимо поточний лінк за id
  const currentLink = useMemo(
    () => links.find(link => link._id === id),
    [links, id]
  );

  const addLinkSchema = Yup.object().shape({
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

    poster: Yup.mixed().notRequired(),
  });

  const initialValues = useMemo(
    () => ({
      nameType: currentLink?.nameType || 'HTML&CSS',
      link: currentLink?.link || '',
      nameLink: currentLink?.nameLink || '',
      textLink: currentLink?.textLink || '',
      poster: '',
    }),
    [currentLink]
  );

  const handleSubmit = (values, actions) => {
    dispatch(editLink({ linkId: id, linkData: values }))
      .unwrap()
      .then(() => {
        toast.success('You have successfully edited the link!');
        actions.resetForm();
        fileInputRef.current.value = '';
        handleClose();
      })
      .catch(err => {
        toast.error(`Edit is not correct: ${err}`);
      });
  };

  const nameTypeId = useId();
  const linkId = useId();
  const nameLinkId = useId();
  const textLinkId = useId();
  const posterId = useId();

  return (
    <div className={css.conteiner}>
      <TitleLink text="Edit Link" />
      {loadingEdit && <RotatingSquareLoading />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addLinkSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.wrapper}>
              <label className={css.label} htmlFor={nameTypeId}>
                Name Type:
              </label>
              <Field as="select" name="nameType" id={nameTypeId}>
                <option value="">All</option>
                <option value="HTML&CSS">HTML&CSS</option>
                <option value="JS">JS</option>
                <option value="React">React</option>
                <option value="TS">TS</option>
                <option value="Node.js">Node.js</option>
                <option value="Video/HTML&CSS">Video/HTML&CSS</option>
                <option value="Video/JS">Video/JS</option>
                <option value="Video/React">Video/React</option>
                <option value="Video/TS">Video/TS</option>
                <option value="Video/Node.js">Video/Node.js</option>
              </Field>
            </div>

            <div className={css.wrapper}>
              <label className={css.label} htmlFor={linkId}>
                Link:
              </label>
              <Field
                type="text"
                name="link"
                className={css.input}
                id={linkId}
              />
              <ErrorMessage
                name="link"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.wrapper}>
              <label className={css.label} htmlFor={nameLinkId}>
                Name Link:
              </label>
              <Field
                type="text"
                name="nameLink"
                className={css.input}
                id={nameLinkId}
              />
              <ErrorMessage
                name="nameLink"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.wrapper}>
              <label className={css.label} htmlFor={textLinkId}>
                Text Link:
              </label>
              <Field
                type="text"
                name="textLink"
                className={css.input}
                id={textLinkId}
              />
              <ErrorMessage
                name="textLink"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.wrapper}>
              <label className={css.label} htmlFor={posterId}>
                Photo
              </label>
              <input
                id={posterId}
                name="poster"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={event => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('poster', file);
                }}
              />
            </div>

            {error && (
              <p className={css.error}>
                Ooops! There was an error! Please reload!
              </p>
            )}

            <button type="submit" className={css.btn}>
              {loadingEdit ? 'Editing...' : 'Edit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

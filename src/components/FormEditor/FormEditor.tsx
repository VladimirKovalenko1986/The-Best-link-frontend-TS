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
import { useId, useRef, useMemo } from 'react';
import type { AppDispatch } from '../../redux/types.ts';
import type { LinkEdit } from '../../redux/links/links.type.ts';
import type { FormikHelpers } from 'formik';
import type { EditLinkFormValues } from './edit.type.ts';
import { editLinkSchema } from './edit.type.ts';
import css from './FormEditor.module.css';

const FormEditor = () => {
  const loadingEdit = useSelector(selectLoadingEditLink);
  const error = useSelector(selectError);
  const id = useSelector(selectModalLinkId);
  const links = useSelector(selectLinks);
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  // Find current link from id
  const currentLink = useMemo(
    () => links.find(link => link._id === id),
    [links, id]
  );

  const initialValues: EditLinkFormValues = useMemo(
    () => ({
      nameType: currentLink?.nameType || 'HTML&CSS',
      link: currentLink?.link || '',
      nameLink: currentLink?.nameLink || '',
      textLink: currentLink?.textLink || '',
      poster: null,
    }),
    [currentLink]
  );

  const handleSubmit = (
    values: EditLinkFormValues,
    actions: FormikHelpers<EditLinkFormValues>
  ) => {
    if (!id) return;

    const { poster, ...rest } = values;

    const payload: LinkEdit = {
      ...rest,
      poster:
        typeof poster === 'string' || poster instanceof File
          ? poster
          : undefined,
    };

    dispatch(editLink({ linkId: id, linkData: payload }))
      .unwrap()
      .then(() => {
        toast.success('You have successfully edited the link!');
        actions.resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
      <Formik<EditLinkFormValues>
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={editLinkSchema}
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
                  const files = event.currentTarget.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setFieldValue('poster', file);
                  }
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
};

export default FormEditor;

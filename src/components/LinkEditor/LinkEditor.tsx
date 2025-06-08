import TitleLink from '../TitleLink/TitleLink.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { addLink, fetchLinks } from '../../redux/links/operations.ts';
import {
  selectLoadingAddLink,
  selectError,
  selectFilter,
} from '../../redux/links/selectors.ts';
import FidgetSpinnerLoading from '../FidgetSpinnerLoading/FidgetSpinnerLoading.tsx';
import { useId, useRef } from 'react';
import { setPage } from '../../redux/links/slice.ts';
import { refreshUser } from '../../redux/auth/operations.ts';
import type { AppDispatch } from '../../redux/types.ts';
import type { FormikHelpers } from 'formik';
import type { LinkEdit } from '../../redux/links/links.type.ts';
import type { AddLinkFormValues } from './addLink.type.ts';
import { addLinkSchema } from './addLink.type.ts';
import css from './LinkEditor.module.css';

export default function LinkEditor() {
  const loadingAddLink = useSelector(selectLoadingAddLink);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filter = useSelector(selectFilter);

  const initialValues: AddLinkFormValues = {
    nameType: 'HTML&CSS',
    link: '',
    nameLink: '',
    textLink: '',
    poster: null,
  };

  const handleSubmit = (
    values: AddLinkFormValues,
    actions: FormikHelpers<AddLinkFormValues>
  ): void => {
    const { poster, ...rest } = values;

    const payload: LinkEdit = {
      ...rest,
      poster: typeof poster === 'string' ? poster : undefined,
    };
    dispatch(addLink(payload))
      .unwrap()
      .then(() => {
        toast.success('Add new link!');
        dispatch(setPage(1));
        dispatch(fetchLinks({ page: 1, limit: 10, filter }));

        // Очищення форми
        actions.resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch(async err => {
        console.log(err);
        if (err === 'Request failed with status code 401') {
          try {
            await dispatch(refreshUser()).unwrap();
            // Після оновлення токена, повторюємо спробу додати лінк
            await dispatch(addLink(payload)).unwrap();
            toast.success('Link added after refreshing token!');
            dispatch(setPage(1));
            dispatch(fetchLinks({ page: 1, limit: 10, filter }));
            actions.resetForm();
            (fileInputRef.current as HTMLInputElement).value = '';
          } catch (refreshError) {
            console.log(refreshError);
            toast.error('Session expired. Please login again.');
          }
        } else {
          toast.error(`Link not added: ${err}`);
        }
      });
  };

  const nameTypeId = useId();
  const linkId = useId();
  const nameLinkId = useId();
  const textLinkId = useId();
  const posterId = useId();

  return (
    <div className={css.conteiner}>
      {loadingAddLink && <FidgetSpinnerLoading />}
      <TitleLink text="Add new link" />
      <Formik<AddLinkFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addLinkSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.wrapper}>
              <label className={css.label} htmlFor={nameTypeId}>
                nameType:
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
                link:{' '}
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
                nameLink:{' '}
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
                textLink:{' '}
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
              {loadingAddLink ? 'Ading...' : 'Add Link'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

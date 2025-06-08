import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/links/selectors.ts';
import { setFilter } from '../../redux/links/slice.ts';
import { fetchLinks } from '../../redux/links/operations.ts';
import type { AppDispatch } from '../../redux/types.ts';
import css from './FilterLink.module.css';

export default function FilterLink() {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector(selectFilter);
  const nameTypeId = useId();

  return (
    <div>
      <Formik
        initialValues={{ nameTypeId: filter }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <label className={css.label} htmlFor={nameTypeId}>
              Filter NameType
            </label>
            <Field
              className={css.input}
              as="select"
              name="nameTypeId"
              id={nameTypeId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const value = e.target.value;
                setFieldValue('nameTypeId', value);
                dispatch(setFilter(value));
                dispatch(fetchLinks({ page: 1, limit: 10, filter: value }));
              }}
            >
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

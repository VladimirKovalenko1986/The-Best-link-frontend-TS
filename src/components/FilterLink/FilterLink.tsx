import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/links/selectors.ts';
import { setFilter } from '../../redux/links/slice.ts';
import { fetchLinks } from '../../redux/links/operations.ts';
import css from './FilterLink.module.css';

export default function FilterLink() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = e => {
    const value = e.target.value;
    dispatch(setFilter(value));
    dispatch(fetchLinks({ page: 1, limit: 10, filter: value }));
  };

  const nameTypeId = useId();
  return (
    <div>
      {/* {loadingDeleteLink && <RevolvingDotLoading />} */}
      <Formik initialValues={{ nameTypeId: filter }} onSubmit={() => {}}>
        {() => (
          <Form className={css.form}>
            <label className={css.label}>Filter NameType</label>
            <Field
              className={css.input}
              as="select"
              name="nameTypeId"
              id={nameTypeId}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="HTML&CSS">HTML&CSS</option>
              <option value="JS">JS</option>
              <option value="React">React</option>
              <option value="TS">TS</option>
              <option value="Node.js">Node.js</option>
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
}

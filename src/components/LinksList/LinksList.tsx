import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectFilter,
  selectLinks,
  selectLoadingAllLinks,
} from '../../redux/links/selectors.ts';
import LinkItem from '../LinkItem/LinkItem.tsx';
import DiscussLoading from '../DiscussLoading/DiscussLoading.tsx';
import { fetchLinks } from '../../redux/links/operations.ts';
import { setPage } from '../../redux/links/slice.ts';
import FilterLink from '../FilterLink/FilterLink.tsx';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import css from './LinksList.module.css';

const LinksList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const links = useSelector(selectLinks);
  const loadingAllLinks = useSelector(selectLoadingAllLinks);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(fetchLinks({ page: 1, limit: 10, filter }));
  }, [dispatch, filter]);

  return (
    <div>
      {loadingAllLinks && <DiscussLoading />}
      <FilterLink />
      <ul className={css.list}>
        {links.map(link => (
          <li key={link._id}>
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
      <ScrollToTopButton />
    </div>
  );
};

export default LinksList;

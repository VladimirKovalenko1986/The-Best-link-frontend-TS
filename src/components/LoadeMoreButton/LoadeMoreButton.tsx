import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectFilter,
  selectHasNextPage,
  selectLinks,
  selectLoadingAllLinks,
} from '../../redux/links/selectors.ts';
import { setPage } from '../../redux/links/slice.ts';
import { fetchLinks } from '../../redux/links/operations.ts';
import DiscussLoading from '../DiscussLoading/DiscussLoading.tsx';
import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { AppDispatch } from '../../redux/types.ts';
import css from './LoadeMoreButton.module.css';

const LoadeMoreButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const hasNextPage = useSelector(selectHasNextPage);
  const filter = useSelector(selectFilter);
  const links = useSelector(selectLinks);
  const loadeAllLinks = useSelector(selectLoadingAllLinks);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const handleLoadeMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchLinks({ page: nextPage, limit: 10, filter }));
    setIsLoadMoreClicked(true);
  };

  useEffect(() => {
    if (!loadeAllLinks && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // See toast only after click button and when links ands
    if (!hasNextPage && isLoadMoreClicked) {
      toast.info('Link is finished! 🚀');
      setIsLoadMoreClicked(false); // Reset syan, that not see toast replay
    }
  }, [loadeAllLinks, hasNextPage, isLoadMoreClicked]);

  return (
    hasNextPage &&
    links.length > 0 && (
      <div className={css.buttonWrapper} ref={buttonRef}>
        <button className={css.btn} onClick={handleLoadeMore}>
          Load More
          {loadeAllLinks && (
            <span className={css.spinnerWrapper}>
              <DiscussLoading />
            </span>
          )}
        </button>
      </div>
    )
  );
};

export default LoadeMoreButton;

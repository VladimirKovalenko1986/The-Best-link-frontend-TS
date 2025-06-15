import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/links/slice.ts';
import ModalDeleteLink from '../ModalDeleteLink/ModalDeleteLink.tsx';
import ModalEditeLink from '../ModalEditeLink/ModalEditeLink.tsx';
import type { LinkItemProps } from './linkItem.type.ts';
import {
  selectIsOpen,
  selectModalLinkId,
  selectModalType,
} from '../../redux/links/selectors.ts';
import type { AppDispatch } from '../../redux/types.ts';
import css from './LinkItem.module.css';

const LinkItem = ({ link }: LinkItemProps) => {
  const { _id, nameType, nameLink, link: href, textLink } = link;

  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector(selectIsOpen);
  const modalLinkId = useSelector(selectModalLinkId);
  const modalType = useSelector(selectModalType);

  return (
    <div className={css.conteiner}>
      <p>{nameType}</p>
      <a
        href={href}
        className={css.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {nameLink}
      </a>
      <p>{textLink}</p>
      <div className={css.wrapper}>
        <button
          className={css.btnDelete}
          onClick={() => dispatch(openModal({ id: _id, type: 'delete' }))}
        >
          Delete
        </button>
        <button
          className={css.btnEdite}
          onClick={() => dispatch(openModal({ id: _id, type: 'edit' }))}
        >
          Edit
        </button>
        {isOpen && modalLinkId === _id && modalType === 'delete' && (
          <ModalDeleteLink />
        )}
        {isOpen && modalLinkId === _id && modalType === 'edit' && (
          <ModalEditeLink />
        )}
      </div>
    </div>
  );
};

export default LinkItem;

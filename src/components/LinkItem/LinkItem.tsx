import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/links/slice.ts';
import ModalDeleteLink from '../ModalDeleteLink/ModalDeleteLink.tsx';
import ModalEditeLink from '../ModalEditeLink/ModalEditeLink.tsx';
import css from './LinkItem.module.css';
import {
  selectIsOpen,
  selectModalLinkId,
  selectModalType,
} from '../../redux/links/selectors.ts';

export default function LinkItem({
  link: { _id, nameType, link, nameLink, textLink },
}) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const modalLinkId = useSelector(selectModalLinkId);
  const modalType = useSelector(selectModalType);

  return (
    <div className={css.conteiner}>
      <p>{nameType}</p>
      <a
        href={link}
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
}

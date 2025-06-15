import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormEditor from '../FormEditor/FormEditor.tsx';
import { closeModal } from '../../redux/links/slice.ts';
import type { AppDispatch } from '../../redux/types.ts';
import { selectTheme } from '../../redux/theme/selectors.ts';
import { selectIsOpen, selectModalType } from '../../redux/links/selectors.ts';
import clsx from 'clsx';
import css from './ModalEditeLink.module.css';

const ModalEditeLink = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const theme = useSelector(selectTheme);
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || modalType !== 'edit' || !modalRoot) return null;

  return createPortal(
    <div className={css.backDrop}>
      <div className={clsx(css.modal, { [css.dark]: theme === 'dark' })}>
        <FormEditor />
        <button className={css.btnClose} onClick={() => dispatch(closeModal())}>
          X
        </button>
        <div className={css.wrapper}></div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalEditeLink;

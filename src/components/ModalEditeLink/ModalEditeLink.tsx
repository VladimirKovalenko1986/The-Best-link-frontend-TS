import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormEditor from '../FormEditor/FormEditor.tsx';
import { closeModal } from '../../redux/links/slice.ts';
import clsx from 'clsx';
import css from './ModalEditeLink.module.css';
import { selectTheme } from '../../redux/theme/selectors.ts';

export default function ModalEditeLink() {
  const dispatch = useDispatch();
  const [modalRoot, setModalRoot] = useState(null);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));

    // 🔹 Блокування скролу
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto'; // Відновлення скролу при закритті
    };
  }, []);

  if (!modalRoot) return null;

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
    document.getElementById('modal-root') // ✅ Модалка рендериться тут
  );
}

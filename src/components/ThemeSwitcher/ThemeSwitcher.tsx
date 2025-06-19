import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/slice.ts';
import { selectTheme } from '../../redux/theme/selectors.ts';
import css from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  return (
    <button className={css.switcher} onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;

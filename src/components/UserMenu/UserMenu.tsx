import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingLogout, selectUser } from '../../redux/auth/selectors.ts';
import { logOut } from '../../redux/auth/operations.ts';
import InfinitySpinLoading from '../InfinitySpinLoading/InfinitySpinLoading.tsx';
import type { AppDispatch } from '../../redux/types.ts';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const loadingLogout = useSelector(selectLoadingLogout);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const photo = user?.photo;
  const name = user?.name;
  const placeholderImage =
    'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const userPhoto =
    photo && typeof photo === 'string' ? photo : placeholderImage;

  const handleLogout = () => {
    dispatch(logOut());
  };

  if (!user || !user.email) {
    return <InfinitySpinLoading />;
  }
  return (
    <div className={css.conteiner}>
      <img className={css.img} src={userPhoto} alt="photo user" />
      <b>Welcom, {name}!</b>
      <button className={css.btn} onClick={handleLogout}>
        {loadingLogout ? 'Logout in user...' : 'Logout'}
      </button>
    </div>
  );
};

export default UserMenu;

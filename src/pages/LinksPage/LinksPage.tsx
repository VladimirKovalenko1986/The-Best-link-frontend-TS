import LinksList from '../../components/LinksList/LinksList.tsx';
import LinkEditor from '../../components/LinkEditor/LinkEditor.tsx';
import LoadeMoreButton from '../../components/LoadeMoreButton/LoadeMoreButton.tsx';
import { useSelector } from 'react-redux';
import { selectLoadingLogout } from '../../redux/auth/selectors.ts';
import InfinitySpinLoading from '../../components/InfinitySpinLoading/InfinitySpinLoading.tsx';
import css from './LinksPage.module.css';

export default function LinksPage() {
  const loadingLogout = useSelector(selectLoadingLogout);
  return (
    <div className={css.conteiner}>
      {loadingLogout && <InfinitySpinLoading />}
      <LinkEditor />
      <LinksList />
      <LoadeMoreButton />
    </div>
  );
}

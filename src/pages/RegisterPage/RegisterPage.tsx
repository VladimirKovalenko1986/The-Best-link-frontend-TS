import TitleLink from '../../components/TitleLink/TitleLink.tsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.tsx';
import RegistrationGoogle from '../../components/RegistrationGoogle/RegistrationGoogle.tsx';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.conteiner}>
      <TitleLink text="Register you account" />
      <RegistrationForm />
      <RegistrationGoogle />
    </div>
  );
};

export default RegisterPage;

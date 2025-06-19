import type { TitleLinkProps } from './titleLink.type';
import css from './TitleLink.module.css';

const TitleLink = ({ text }: TitleLinkProps) => {
  return (
    <div className={css.conteiner}>
      <h1>{text}</h1>
    </div>
  );
};

export default TitleLink;

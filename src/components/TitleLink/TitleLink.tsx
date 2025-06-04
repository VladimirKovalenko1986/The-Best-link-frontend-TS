import css from "./TitleLink.module.css";

export default function TitleLink({ text }) {
  return (
    <div className={css.conteiner}>
      <h1>{text}</h1>
    </div>
  );
}

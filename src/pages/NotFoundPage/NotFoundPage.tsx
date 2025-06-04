import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <p className={css.textError}>Oppps! Page not found! Sorry!</p>
      <p>
        Please visit out{" "}
        <Link to="/" className={css.link}>
          home page
        </Link>
      </p>
    </div>
  );
}

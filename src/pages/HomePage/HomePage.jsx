import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToCatalog = () => {
    navigate("/catalog");
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <button className={css.button} onClick={goToCatalog}>
        View Catalog
      </button>
    </div>
  );
}

export default HomePage;

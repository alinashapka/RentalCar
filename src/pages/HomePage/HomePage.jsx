import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

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
      <Button className={css.viewBtn} onClick={goToCatalog}>
        View Catalog
      </Button>
    </div>
  );
}

export default HomePage;

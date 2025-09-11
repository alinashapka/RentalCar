import css from "./CarCard.module.css";
import Icon from "../Icon/Icon.jsx";
import { useNavigate } from "react-router-dom";

function CarCard({
  year,
  brand,
  model,
  type,
  img,
  rentalPrice,
  rentalCompany,
  address,
  mileage,
}) {
  const formattedMileage = new Intl.NumberFormat("fr-FR").format(mileage);

  const navigate = useNavigate();

  const goToDetails = (id) => {
    navigate(`/catalog/${id}`);
  };

  return (
    <>
      <div className={css.card}>
        <img className={css.img} src={img} alt={model} />
        {/* <Icon id="heart" classname={css.icon} /> */}
        <div className={css.wrapper}>
          <div className={css.detailsWrapper}>
            <p className={css.details}>
              {brand} <span className={css.accent}>{model}</span>, {year}
            </p>
            <p className={css.price}>${rentalPrice}</p>
          </div>
          <div className={css.moreDetailsWrapper}>
            <p className={css.moreDetails}>
              {address} | {rentalCompany}
            </p>
            <p className={css.moreDetails}>
              {type} | {formattedMileage} km
            </p>
          </div>
        </div>
        <button className={css.button} onClick={goToDetails}>
          Read More
        </button>
      </div>
    </>
  );
}

export default CarCard;

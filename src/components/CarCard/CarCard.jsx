import css from "./CarCard.module.css";
import Icon from "../Icon/Icon.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/slice.js";
import { selectIsFavourite } from "../../redux/favourites/selectors";
import { formatMileage } from "../../utils/formatMileage.js";

function CarCard({
  id,
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
  const formattedMileage = formatMileage(mileage);

  const navigate = useNavigate();

  const goToDetails = (id) => {
    navigate(`/catalog/${id}`);
  };

  const dispatch = useDispatch();
  const isFavourite = useSelector(selectIsFavourite(id));

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavourite(id));
  };

  return (
    <>
      <div className={css.card}>
        <img className={css.img} src={img} alt={model} />
        <button
          className={`${css.heartButton} ${isFavourite ? css.favorite : ""}`}
          onClick={handleFavouriteClick}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          <Icon id="heart" className={css.heartIcon} size={16} />
        </button>
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
        <button className={css.button} onClick={() => goToDetails(id)}>
          Read More
        </button>
      </div>
    </>
  );
}

export default CarCard;

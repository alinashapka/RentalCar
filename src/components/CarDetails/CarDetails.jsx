import css from "./CarDetails.module.css";
import RentalForm from "../RentalForm/RentalForm";
import Icon from "../Icon/Icon.jsx";
import Loader from "../Loader/Loader.jsx";
import { fetchCarById } from "../../redux/cars/operations.js";
import { selectCurrentCar } from "../../redux/cars/selectors.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatMileage } from "../../utils/formatMileage.js";

function CarDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectCurrentCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <Loader />;

  const formattedMileage = formatMileage(car.mileage);

  const specs = [
    { label: "Year", value: car.year, icon: "calendar" },
    { label: "Type", value: car.type, icon: "car" },
    {
      label: "Fuel Consumption",
      value: car.fuelConsumption,
      icon: "fuel-pump",
    },
    { label: "Engine Size", value: car.engineSize, icon: "gear" },
  ];

  return (
    <div className={css.container}>
      <div className={css.imgWrapper}>
        <img className={css.img} src={car.img} alt={car.model} />
        <RentalForm />
      </div>

      <div className={css.detailsWrapper}>
        <h3 className={css.title}>
          {car.brand} {car.model} {car.year}
        </h3>
        <div className={css.iconWrapper}>
          <Icon id="location" className={css.icon} size={16} />
          <p className={css.text}>{car.address}</p>
          <p className={css.text}>Mileage: {formattedMileage} km</p>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.text}>{car.description}</p>

        <div className={css.listContainer}>
          <h4 className={css.subtitle}>Rental Conditions: </h4>
          <ul className={css.list}>
            {car.rentalConditions.map((condition, index) => (
              <li key={index} className={css.item}>
                <Icon id="check-circle" className={css.icon} size={16} />
                {condition}
              </li>
            ))}
          </ul>

          <h4 className={css.subtitle}>Car Specifications: </h4>
          <ul className={css.list}>
            {specs.map((spec, idx) => (
              <li key={idx} className={css.item}>
                <Icon id={spec.icon} className={css.icon} size={16} />
                <p className={css.text}>
                  {spec.label}: {spec.value}
                </p>
              </li>
            ))}
          </ul>

          <h4 className={css.subtitle}>Accessories and functionalities: </h4>
          <ul className={css.list}>
            {[...(car.accessories || []), ...(car.functionalities || [])].map(
              (item, index) => (
                <li key={index} className={css.item}>
                  <Icon id="check-circle" className={css.icon} size={16} />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;

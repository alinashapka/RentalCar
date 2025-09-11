import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operations.js";
import {
  selectCars,
  selectCarsPage,
  selectCarsTotalPages,
  selectCarsLoading,
} from "../../redux/cars/selectors.js";

function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const page = useSelector(selectCarsPage);
  const totalPages = useSelector(selectCarsTotalPages);
  const isLoading = useSelector(selectCarsLoading);
  const fetchedPages = useRef(new Set());

  useEffect(() => {
    if (!fetchedPages.current.has(page)) {
      dispatch(fetchCars());
      fetchedPages.current.add(page);
    }
  }, [dispatch, page]);

  const handleLoadMore = () => {
    if (page < totalPages && !isLoading) {
      dispatch({ type: "cars/loadNextPage" });
    }
  };
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <li className={css.item} key={car.id}>
            <CarCard
              id={car.id}
              img={car.img}
              brand={car.brand}
              model={car.model}
              year={car.year}
              rentalPrice={car.rentalPrice}
              address={car.address}
              rentalCompany={car.rentalCompany}
              type={car.type}
              mileage={car.mileage}
            />
          </li>
        ))}
      </ul>

      {cars.length > 0 && page < totalPages && (
        <button className={css.button} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default CarList;

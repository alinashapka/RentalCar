import css from "./CarFilters.module.css";
import { styles } from "./CarFiltersStyles.js";
import Icon from "../Icon/Icon.jsx";
import Button from "../Button/Button.jsx";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBrand, setPrice, setMileage } from "../../redux/filters/slice.js";
import {
  selectBrand,
  selectPrice,
  selectMileage,
  selectBrands,
  selectFiltersLoading,
} from "../../redux/filters/selectors";
import { fetchBrands } from "../../redux/filters/operations.js";
import { resetCars } from "../../redux/cars/slice.js";

function CarFilters() {
  const dispatch = useDispatch();
  const brand = useSelector(selectBrand);
  const brands = useSelector(selectBrands);
  const filtersLoading = useSelector(selectFiltersLoading);
  const rentalPrice = useSelector(selectPrice);
  const mileage = useSelector(selectMileage);

  const [localBrand, setLocalBrand] = useState(brand);
  const [localPrice, setLocalPrice] = useState(rentalPrice);
  const [mileageFrom, setMileageFrom] = useState(mileage.from || "");
  const [mileageTo, setMileageTo] = useState(mileage.to || "");

  const prices = [
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
    { value: 60, label: "60" },
    { value: 70, label: "70" },
    { value: 80, label: "80" },
  ];

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleBrandChange = (selectedOption) => {
    setLocalBrand(selectedOption ? selectedOption.value : null);
  };

  const handlePriceChange = (selectedOption) => {
    setLocalPrice(selectedOption ? selectedOption.value : null);
  };

  const handleMileageFromChange = (e) => {
    const value = e.target.value;
    setMileageFrom(value);
  };

  const handleMileageToChange = (e) => {
    const value = e.target.value;
    setMileageTo(value);
  };

  const handleSearch = () => {
    dispatch(resetCars());

    dispatch(setBrand(localBrand));
    dispatch(setPrice(localPrice));
    dispatch(
      setMileage({
        from: mileageFrom ? Number(mileageFrom) : null,
        to: mileageTo ? Number(mileageTo) : null,
      })
    );

    setLocalBrand(null);
    setLocalPrice(null);
    setMileageFrom("");
    setMileageTo("");
  };

  const DropdownIndicator = (props) => {
    const { selectProps } = props;
    const isOpen = selectProps.menuIsOpen;

    return (
      <components.DropdownIndicator {...props}>
        <div
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon id="arrow" size={16} />
        </div>
      </components.DropdownIndicator>
    );
  };

  const selectedBrand =
    brands.length > 0 && localBrand
      ? { value: localBrand, label: localBrand }
      : null;

  const selectedPrice = localPrice
    ? {
        value: localPrice,
        label: `To $${localPrice}`,
      }
    : null;

  return (
    <div className={css.container}>
      <div className={css.filterWrapper}>
        <label className={css.label}>Car brand</label>
        <div className={css.selectWrapper}>
          <Select
            classNamePrefix="figmaSelect"
            options={brands.map((b) => ({ value: b, label: b }))}
            value={selectedBrand}
            placeholder="Choose a brand"
            components={{ DropdownIndicator }}
            onChange={handleBrandChange}
            styles={{
              ...styles,
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            isSearchable={false}
            isLoading={filtersLoading}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>

      <div className={css.filterWrapper}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.selectWrapper}>
          <Select
            classNamePrefix="figmaSelect"
            options={prices}
            value={selectedPrice}
            placeholder="Choose a price"
            components={{ DropdownIndicator }}
            onChange={handlePriceChange}
            styles={{
              ...styles,
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            isSearchable={false}
            isLoading={filtersLoading}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>

      <div className={css.filterWrapper}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.rangeInputs}>
          <input
            type="number"
            className={css.rangeInputFrom}
            placeholder="From"
            value={mileageFrom}
            onChange={handleMileageFromChange}
            min="0"
          />
          <input
            type="number"
            className={css.rangeInputTo}
            placeholder="To"
            value={mileageTo}
            onChange={handleMileageToChange}
            min="0"
          />
        </div>
      </div>

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default CarFilters;

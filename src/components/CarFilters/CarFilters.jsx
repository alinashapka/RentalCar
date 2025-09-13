import css from "./CarFilters.module.css";
import Icon from "../Icon/Icon.jsx";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrand,
  setPrice,
  setMileage,
  resetFilters,
} from "../../redux/filters/slice.js";
import {
  selectBrand,
  selectPrice,
  selectMileage,
  selectBrands,
} from "../../redux/filters/selectors";
import { fetchBrands } from "../../redux/filters/operations.js";

function CarFilters() {
  const dispatch = useDispatch();
  const brand = useSelector(selectBrand);
  const brands = useSelector(selectBrands);
  const rentalPrice = useSelector(selectPrice);
  const mileage = useSelector(selectMileage);

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
    dispatch(setBrand(selectedOption ? selectedOption.value : null));
  };

  const handlePriceChange = (selectedOption) => {
    dispatch(setPrice(selectedOption ? selectedOption.value : null));
  };

  const handleMileageFromChange = (e) => {
    const value = e.target.value;
    setMileageFrom(value);
    dispatch(
      setMileage({
        from: value ? Number(value) : null,
        to: mileageTo ? Number(mileageTo) : null,
      })
    );
  };

  const handleMileageToChange = (e) => {
    const value = e.target.value;
    setMileageTo(value);
    dispatch(
      setMileage({
        from: mileageFrom ? Number(mileageFrom) : null,
        to: value ? Number(value) : null,
      })
    );
  };

  //   const handleReset = () => {
  //     dispatch(resetFilters());
  //     setMileageFrom("");
  //     setMileageTo("");
  //   };

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

  const styles = {
    control: (base, state) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      borderRadius: "12px",
      padding: "12px 16px",
      width: "204px",
      height: "44px",
      background: "#f7f7f7",
      border: "none",
      cursor: "pointer",
      boxShadow: "none",
      "&:hover": {
        background: "#f0f0f0",
      },
    }),

    menu: (base) => ({
      ...base,
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0px 4px 16px rgba(17, 17, 17, 0.1)",
      border: "1px solid #f0f0f0",
      marginTop: "4px",
      overflow: "hidden",
      zIndex: 9999,
    }),

    menuList: (base) => ({
      ...base,
      padding: "8px 0",
      borderRadius: "12px",
      maxHeight: "200px",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f8f9fa" : "#ffffff",
      color: "#8d929a",
      padding: "12px 16px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "background-color 0.15s ease",

      "&:hover": {
        backgroundColor: "#f8f9fa",
      },

      ...(state.isSelected && {
        backgroundColor: "#e3f2fd",
        color: "#1976d2",
        fontWeight: "500",
      }),
    }),

    placeholder: (base) => ({
      ...base,
      color: "#101828",
      fontWeight: "500",
      fontSize: "16px",
      textAlign: "left",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#666666",
      padding: "0",
      "&:hover": {
        color: "#333333",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#101828",
      fontWeight: "500",
      fontSize: "16px",
      textAlign: "left",
    }),
  };

  const selectedBrand =
    brands.length > 0 && brand ? { value: brand, label: brand } : null;

  const selectedPrice = rentalPrice
    ? {
        value: rentalPrice,
        label: `To $${rentalPrice}`,
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
            styles={styles}
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="absolute"
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
            styles={styles}
            isSearchable={false}
            menuPortalTarget={null}
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

      <button className={css.button} type="button">
        Search
      </button>
    </div>
  );
}

export default CarFilters;

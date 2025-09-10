import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  mileage: "",
  price: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload.brand;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload.mileage;
    },
    setPrice: (state, action) => {
      state.price = action.payload.price;
    },
    resetFilters: (state) => {
      state.brand = "";
      state.mileage = "";
      state.price = "";
    },
  },
});

export const { setBrand, setPrice, setMileage, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;

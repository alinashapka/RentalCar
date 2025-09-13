import { createSlice } from "@reduxjs/toolkit";
import { handlePending, handleError } from "../../utils/reduxUtils";
import { fetchBrands } from "./operations";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    brand: null,
    rentalPrice: null,
    mileage: {
      from: null,
      to: null,
    },
    brands: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
    resetFilters: (state) => {
      state.brand = null;
      state.rentalPrice = null;
      state.mileage = { from: null, to: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, handleError);
  },
});

export const { setBrand, setPrice, setMileage, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;

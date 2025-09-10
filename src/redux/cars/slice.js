import { createSlice } from "@reduxjs/toolkit";
import { handlePending, handleError } from "../../utils/reduxUtils";
import { fetchCars } from "./operations.js";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Increment page for Load More
    loadNextPage: (state) => {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
    // Reset cars list (for new search)
    resetCars: (state) => {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        const { cars, page, totalPages } = action.payload;

        if (state.page === 1) {
          state.cars = cars;
        } else {
          state.cars = [...state.cars, ...cars];
        }
        state.page = page;
        state.totalPages = totalPages;
      })
      .addCase(fetchCars.rejected, handleError);
  },
});

export const { loadNextPage, resetCars } = carsSlice.actions;
export default carsSlice.reducer;

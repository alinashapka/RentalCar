import { createSlice } from "@reduxjs/toolkit";
import { handlePending, handleError } from "../../utils/reduxUtils";
import { fetchCarById, fetchCars } from "./operations.js";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    currentCar: null,
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    loadNextPage: (state) => {
      if (state.page < state.totalPages) {
        state.page = Number(state.page) + 1;
      }
    },

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
          state.cars = [
            ...state.cars,
            ...cars.filter((car) => !state.cars.some((c) => c.id === car.id)),
          ];
        }

        state.page = Number(page);
        state.totalPages = Number(totalPages);
      })
      .addCase(fetchCars.rejected, handleError)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.currentCar = action.payload;
      })
      .addCase(fetchCarById.rejected, handleError);
  },
});

export const { loadNextPage, resetCars } = carsSlice.actions;
export default carsSlice.reducer;

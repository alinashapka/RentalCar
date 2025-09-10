import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
import filtersReducer from "./filters/slice.js";
import favouritesReducer from "./favourites/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favourites: favouritesReducer,
  },
});

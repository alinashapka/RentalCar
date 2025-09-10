import { createSlice } from "@reduxjs/toolkit";
import { handlePending, handleError } from "../../utils/reduxUtils";
import { fetchFavourites } from "./operations.js";

const favouritesSlice = createSlice({
  name: "favourites",
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
    // Reset fav list (for new search)
    resetFavourites: (state) => {
      state.cars = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, handlePending)
      .addCase(fetchFavourites.fulfilled, (state, action) => {
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
      .addCase(fetchFavourites.rejected, handleError);
  },
});

export const { loadNextPage, resetFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

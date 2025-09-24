import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favouriteCarIds: [],
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const carId = action.payload;
      const isFavourite = state.favouriteCarIds.includes(carId);

      if (isFavourite) {
        state.favouriteCarIds = state.favouriteCarIds.filter(
          (id) => id !== carId
        );
      } else {
        state.favouriteCarIds.push(carId);
      }
    },
    clearAllFavourites: (state) => {
      state.favouriteCarIds = [];
    },
  },
});

export const { toggleFavourite, clearAllFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

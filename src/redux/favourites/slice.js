import { createSlice } from "@reduxjs/toolkit";

const loadFavouritesFromStorage = () => {
  try {
    const savedFavourites = localStorage.getItem("favouriteCarIds");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  } catch (error) {
    console.error("Error loading favourites from localStorage:", error);
    return [];
  }
};

const saveFavouritesToStorage = (favouriteIds) => {
  try {
    localStorage.setItem("favouriteCarIds", JSON.stringify(favouriteIds));
  } catch (error) {
    console.error("Error saving favourites to localStorage:", error);
  }
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favouriteCarIds: loadFavouritesFromStorage(),
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

      saveFavouritesToStorage(state.favouriteCarIds);
    },
    clearAllFavourites: (state) => {
      state.favouriteCarIds = [];
      saveFavouritesToStorage([]);
    },
  },
});

export const { toggleFavourite, clearAllFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;

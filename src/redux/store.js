import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import carsReducer from "./cars/slice.js";
import filtersReducer from "./filters/slice.js";
import favouritesReducer from "./favourites/slice.js";

const favouritesPersistConfig = {
  key: "favourites",
  storage,
  whitelist: ["favouriteCarIds"],
};

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

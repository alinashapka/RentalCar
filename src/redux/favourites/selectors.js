export const selectFavouriteCarIds = (state) =>
  state.favourites.favouriteCarIds;

export const selectIsFavourite = (id) => (state) =>
  state.favourites.favouriteCarIds.includes(id);

export const selectFavouriteCars = (state) => {
  const favouriteIds = state.favourites.favouriteCarIds;
  const allCars = state.cars.cars;
  return allCars.filter((car) => favouriteIds.includes(car.id));
};

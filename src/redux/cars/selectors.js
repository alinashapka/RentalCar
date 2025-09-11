export const selectCars = (state) => state.cars.cars;
export const selectCarsPage = (state) => Number(state.cars.page) || 1;
export const selectCarsTotalPages = (state) => state.cars.totalPages;
export const selectCarsLoading = (state) => state.cars.isLoading;
export const selectCarsError = (state) => state.cars.error;

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";
import { selectCarsPage } from "./selectors.js";
import {
  selectBrand,
  selectPrice,
  selectMileage,
} from "../filters/selectors.js";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const page = selectCarsPage(state);
    const brand = selectBrand(state);
    const rentalPrice = selectPrice(state);
    const mileage = selectMileage(state);
    try {
      const params = { page };
      if (brand) params.brand = brand;
      if (rentalPrice) params.rentalPrice = rentalPrice;
      if (mileage.from) params.minMileage = mileage.from;
      if (mileage.to) params.maxMileage = mileage.to;

      const response = await api.get("/cars", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

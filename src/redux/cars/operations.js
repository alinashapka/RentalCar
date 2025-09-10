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
    const price = selectPrice(state);
    const mileage = selectMileage(state);
    try {
      const response = await api.get("/cars", {
        params: { page, brand, price, mileage },
      });
      console.log("Fetched data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, rejectWithValue) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

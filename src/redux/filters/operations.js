import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/brands");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

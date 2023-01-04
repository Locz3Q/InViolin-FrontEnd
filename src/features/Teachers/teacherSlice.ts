import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teacherService from "./teacherService";

const initialState = {
  teachers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getAllTeachers = createAsyncThunk('teachers', 
  async (_, thunkAPI) => {
    try {
      return await teacherService.getTeachers();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.teachers = action.payload
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  },
});

export const {reset} = teacherSlice.actions;
export default teacherSlice.reducer;
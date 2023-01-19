import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../Interfaces/types";
import lessonService from "../lessons/lessonService";

const lessons: Lesson[] = []

const initialState = {
  lessons: lessons,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createLesson = createAsyncThunk('lessons/createLesson', async (data: Lesson, thunkAPI) => {
  try {
    return await lessonService.createLesson(data);
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const getLessons = createAsyncThunk('lessons/getLessons', async (ids: string[], thunkAPI) => {
  try {
    return await lessonService.getLessons(ids);
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const deleteLesson = createAsyncThunk('lesson/delete', async (id: string, thunkAPI) => {
  try {
    return await lessonService.deleteLesson(id)
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lessons?.push(action.payload)
      })
      .addCase(createLesson.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getLessons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lessons = action.payload
      })
      .addCase(getLessons.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lessons = state.lessons.filter(
          (q: any) => q._id !== action.payload.id
        )
      })
      .addCase(deleteLesson.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.lessons = null;
      })
  }
})

export const {reset} = lessonSlice.actions;
export default lessonSlice.reducer;
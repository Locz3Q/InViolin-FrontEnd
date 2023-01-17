import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Queue } from "../../Interfaces/types";
import queueService from "./queueService";

const queue: Queue[] = JSON.parse(localStorage.getItem('queue')!)

const initialState = {
  queue: queue ? queue : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createDocument = createAsyncThunk('queue/create', async (data: Queue, thunkAPI) => {
  try {
    return await queueService.createQueueDocument(data);
  } catch (error :any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const getQueue = createAsyncThunk('queue/get', async (id: string | undefined, thunkAPI) => {
  try {
    return await queueService.getQueue(id)
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

export const getTeacherQueue = createAsyncThunk('queue/teacherGet', async (id: string | undefined, thunkAPI) => {
  try {
    return await queueService.getQueue(id)
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

export const deleteItem = createAsyncThunk('queue/delete', async (id: string, thunkAPI) => {
  try {
    return await queueService.deleteItem(id)
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

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.queue.push(action.payload as never)
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getQueue.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getQueue.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.queue.pop()
      })
      .addCase(getQueue.rejected, (state, action: any) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getTeacherQueue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherQueue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.queue = action.payload;
      })
      .addCase(getTeacherQueue.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.queue = null;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.queue = state.queue.filter(
          (q: any) => q._id !== action.payload.id
        )
      })
      .addCase(deleteItem.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.queue = null;
      })
  },
});

export const {reset} = queueSlice.actions;
export default queueSlice.reducer;
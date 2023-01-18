import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, Teacher, Lesson } from "../../Interfaces/types";
import authService from "./authService";

// Get user fom localstorage
const user: User | Teacher = JSON.parse(localStorage.getItem('user')!)

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Register
export const register = createAsyncThunk('auth/register', async (user: User | Teacher, thunkAPI: any) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message = (error.response && error.response.data && (error.data.message || error.message || error.toString()));
    return thunkAPI.rejectWithValue(message);
  }
})

//Login
export const login = createAsyncThunk('auth/login', async (user: any, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message = (error.response && error.response.data && (error.data.message || error.message || error.toString()));
    return thunkAPI.rejectWithValue(message);
  }
})

export const getUser = createAsyncThunk('auth/getUser', async (user: any, thunkAPI) => {
  try {
    return await authService.getUser(user);
  } catch (error: any) {
    const message = (error.response && error.response.data && (error.data.message || error.message || error.toString()));
    return thunkAPI.rejectWithValue(message);
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state: any, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AddTeacher, User } from "../../Interfaces/types";
import studentService from "./studentService";

const students: User[] = JSON.parse(localStorage.getItem('students')!)

const initialState = {
  students: students ? students : [],
  isErrorStudent: false,
  isSuccessStudent: false,
  isLoadingStudent: false,
  messageStudent: '',
};

export const getStudentData = createAsyncThunk('students', async (userData: (string | undefined)[], thunkAPI) => {
  try {
    return await studentService.getStudent(userData);
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getTeacherStudentsData = createAsyncThunk('students/teacher', async (userData: (string | undefined)[], thunkAPI) => {
  try {
    return await studentService.getTeacherStudents(userData);
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addTeacherToStudent = createAsyncThunk('students/addTeacher', async (data: AddTeacher, thunkAPI) => {
  try {
    return await studentService.addTeacherToStudent(data);
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

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    resetStudent: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentData.pending, (state) => {
        state.isLoadingStudent = true
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        state.isLoadingStudent = false
        state.isSuccessStudent = true
        state.students = action.payload
      })
      .addCase(getStudentData.rejected, (state, action) => {
        state.isLoadingStudent = false
        state.isErrorStudent = true
        state.messageStudent = action.payload as string
      })
      .addCase(getTeacherStudentsData.pending, (state) => {
        state.isLoadingStudent = true
      })
      .addCase(getTeacherStudentsData.fulfilled, (state, action) => {
        state.isLoadingStudent = false
        state.isSuccessStudent = true
        state.students = action.payload
      })
      .addCase(getTeacherStudentsData.rejected, (state, action) => {
        state.isLoadingStudent = false
        state.isErrorStudent = true
        state.messageStudent = action.payload as string
      })
      .addCase(addTeacherToStudent.pending, (state) => {
        state.isLoadingStudent = true
      })
      .addCase(addTeacherToStudent.fulfilled, (state, action: any) => {
        state.isLoadingStudent = false
        state.isSuccessStudent = true
        state.students = action.payload
      })
      .addCase(addTeacherToStudent.rejected, (state, action) => {
        state.isLoadingStudent = false
        state.isErrorStudent = true
        state.messageStudent = action.payload as string
      })
  },
});

export const {resetStudent} = studentSlice.actions;
export default studentSlice.reducer;
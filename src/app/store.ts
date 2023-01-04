import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import teacherReducer from '../features/Teachers/teacherSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teacherReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
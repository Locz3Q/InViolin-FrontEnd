import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import teacherReducer from '../features/Teachers/teacherSlice'
import studentReducer from '../features/users/studentSlice'
import queueReducer from '../features/queue/queueSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teacherReducer,
    studentsArr: studentReducer,
    queueArr: queueReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
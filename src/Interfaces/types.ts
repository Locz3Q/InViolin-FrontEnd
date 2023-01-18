import { Dayjs } from 'dayjs';

// Interfejsy danych z api

export interface User {
  _id?: string,
  email: string,
  username: string,
  password: string,
  name: string,
  surname: string,
  level: number,
  isTeacher: boolean,
  teacher: string | null,
  lessons: string[]
}

export interface Teacher {
  _id?: string,
  email: string,
  username: string,
  password: string,
  students: string[],
  name: string,
  surname: string,
  level: number,
  isTeacher: boolean,
  lessons: string[]
}

export interface Queue {
  student: string | undefined,
  teacher: string | undefined,
  context: string,
  approve?: boolean
}

export interface AddTeacher {
  studentId: string,
  teacherId: string
}

export interface Lesson {
  student: string,
  teacher: string,
  studentName?: string,
  topic: string,
  isRemote: boolean,
  date: Dayjs
}
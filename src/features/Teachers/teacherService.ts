import axios from "axios";
import { AddTeacher } from "../../Interfaces/types";

const API_URL = 'api/teachers/';

const user: any = JSON.parse(localStorage.getItem('user')!)

const getTeachers = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const response = await axios.get(API_URL, config);
  return response.data;
}

const getTeacherByID = async(id: string | null, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL + id)
  return response.data;
}

const addStudentToTeacher = async (data: AddTeacher) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const { studentId, teacherId } = data;
  const response = await axios.put(`${API_URL}addStudent/${teacherId}`, {studentId}, config)
  return response.data;
}

const teacherService = {
  getTeachers,
  getTeacherByID,
  addStudentToTeacher
}

export default teacherService;
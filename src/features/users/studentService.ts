import axios from "axios";
import { AddTeacher, User } from "../../Interfaces/types";

const API_URL_STUDENTS = 'api/students/';

const getStudent = async (userData: (string | undefined)[]) => {
  const students = userData.join('-');
  const response = await axios.get(`${API_URL_STUDENTS}?ids=${students}`);
  return response.data;
}

const getTeacherStudents = async (userData: (string | undefined)[]) => {
  const students = userData.join('-');
  const response = await axios.get(`${API_URL_STUDENTS}?ids=${students}`);
  return response.data;
}

const addTeacherToStudent = async (data: AddTeacher) => {
  const { studentId, teacherId } = data;
  const response = await axios.put(`${API_URL_STUDENTS}addTeacher/${studentId}`, {teacherId})
  if(response.data) {
    localStorage.setItem('students', JSON.stringify(response.data));
    return response.data;
  }
}

const studentService = {
  getStudent,
  addTeacherToStudent,
  getTeacherStudents
};

export default studentService;
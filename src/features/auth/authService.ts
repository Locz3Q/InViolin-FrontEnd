import axios from "axios";
import { User, Teacher } from "../../Interfaces/types";

const API_URL_STUDENTS = '/api/students/';
const API_URL_TEACHERS = '/api/teachers/';

const register = async (userData: User | Teacher) => {
  const response = await axios.post((userData.isTeacher ? API_URL_TEACHERS : API_URL_STUDENTS) + 'signup', userData);
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
}

const login = async (userData: any) => {
  const response = await axios.post((userData.isTeacher ? API_URL_TEACHERS : API_URL_STUDENTS) + 'signin', userData);
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
}

const getUser = async (userData: any) => {
  let response;
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  }  
  if(userData.isTeacher) {
    response = await axios.get(API_URL_TEACHERS + 'me', config);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  else {
    response = await axios.get(API_URL_STUDENTS + 'me', config);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('students');
  localStorage.removeItem('queue');
}

const authService = {
  register,
  logout,
  login,
  getUser
}

export default authService;

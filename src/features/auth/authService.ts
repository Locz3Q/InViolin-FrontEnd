import axios from "axios";
import { User } from "../../Interfaces/types";

const API_URL_STUDENTS = '/api/students/';
const API_URL_TEACHERS = '/api/teachers/';

const register = async (userData: User) => {
  const response = await axios.post((userData.isTeacher ? API_URL_TEACHERS : API_URL_STUDENTS) + 'signup', userData);
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

const login = async (userData: User) => {
  let response;
  
  response = await axios.post(API_URL_TEACHERS + 'signin', userData);
  
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  else {
    response = await axios.post(API_URL_STUDENTS + 'signin', userData);
    
    if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login
}

export default authService;

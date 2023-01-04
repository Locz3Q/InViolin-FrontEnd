import axios from "axios";

const API_URL = '/api/teachers/';

const getTeachers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

const teacherService = {
  getTeachers,
}

export default teacherService;
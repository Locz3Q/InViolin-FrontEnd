import axios from "axios";
import { Lesson, Teacher, User } from "../../Interfaces/types";

const API_URL_LESSONS = 'api/lessons/';

const user: any = JSON.parse(localStorage.getItem('user')!)

const createLesson = async (data: Lesson) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  console.log(user)
  const dataToSend = { teacher: data.teacher, student: data.student, date: data.date, topic: data.topic, isRemote: data.isRemote};
  const response = await axios.post(API_URL_LESSONS, dataToSend, config);
  return response.data;
}

const getLessons = async (ids: string[]) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const splitIds = ids.join('-');
  const response = await axios.get(`${API_URL_LESSONS}?ids=${splitIds}`, config);
  if(response.data) {
    localStorage.setItem('lessons', JSON.stringify(response.data));
    return response.data;
  }
}

const deleteLesson = async (id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const response = await axios.delete(API_URL_LESSONS + id, config);
  if(response.data) {
    localStorage.setItem('lessons', JSON.stringify(response.data));
    return response.data;
  }
}

const lessonService = {
  createLesson,
  getLessons,
  deleteLesson
};

export default lessonService;
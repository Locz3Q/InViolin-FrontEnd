import axios from "axios";
import { Lesson } from "../../Interfaces/types";

const API_URL_LESSONS = '/api/lessons/';

const createLesson = async (data: Lesson) => {
  const dataToSend = { teacher: data.teacher, student: data.student, date: data.date, topic: data.topic, isRemote: data.isRemote};
  const response = await axios.post(API_URL_LESSONS, dataToSend);
  return response.data;
}

const getLessons = async (ids: string[]) => {
  const splitIds = ids.join('-');
  const response = await axios.get(`${API_URL_LESSONS}?ids=${splitIds}`);
  if(response.data) {
    localStorage.setItem('lessons', JSON.stringify(response.data));
    return response.data;
  }
}

const lessonService = {
  createLesson,
  getLessons
};

export default lessonService;
import axios from 'axios';
import { Queue } from '../../Interfaces/types';

const API_URL = 'api/queue/'

const createQueueDocument = async (data: Queue) => {
  const response = await axios.post(API_URL, data);
  return response.data;
}

const getQueue = async (id: string | undefined) => {
  const response = await axios.get(`${API_URL}${id}`);
  if(response.data) {
    localStorage.setItem('queue', JSON.stringify(response.data));
    return response.data;
  }
}

const deleteItem = async(id: string) => {
  const response = await axios.delete(API_URL + id);
  if(response.data) {
    localStorage.setItem('queue', JSON.stringify(response.data));
    return response.data;
  }
}

const queueService = {
  createQueueDocument,
  getQueue,
  deleteItem,
}

export default queueService;
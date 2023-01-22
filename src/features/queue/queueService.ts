import axios from 'axios';
import { Queue } from '../../Interfaces/types';

const API_URL = 'api/queue/'

const user: any = JSON.parse(localStorage.getItem('user')!)

const createQueueDocument = async (data: Queue) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const response = await axios.post(API_URL, data, config);
  return response.data;
}

const getQueue = async (id: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const response = await axios.get(`${API_URL}${id}`, config);
  if(response.data) {
    localStorage.setItem('queue', JSON.stringify(response.data));
    return response.data;
  }
}

const deleteItem = async(id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }  
  const response = await axios.delete(API_URL + id, config);
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
/* eslint-disable */
import api from './api';
import { toast } from 'react-toastify';

export async function getActivities(token) {  
  try{ 
    const response = await api.get(`/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch(err) {
    toast.error(err.message);
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
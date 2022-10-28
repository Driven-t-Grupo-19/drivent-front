/* eslint-disable */
import api from './api';
import { toast } from 'react-toastify';

export async function getHotelRooms(token, id) {  
  try{ 
    const response = await api.get(`/accommodations/${id}`, {
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

export async function bookRoom(token, id){
  try{ 
    const response = await api.post(`/accommodations/book/${id}`,null, {
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

export async function checkUserPurchase(token){
  try{ 
    const response = await api.get(`/user/accommodations`, {
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

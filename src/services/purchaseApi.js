import api from './api';
import { toast } from 'react-toastify';

export async function getPurchase(token) {  
  try{ 
    const response = await api.get('/purchases', {
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

export async function postOrUpdatePurchase(token) {
  try{ 
    const infoPurchase = JSON.parse(localStorage.getItem('modality'));
    const body = {
      isOnline: infoPurchase.ticket === 'Online'? true : false,
      total: infoPurchase.value,
      acommodation: infoPurchase.ticket === 'Online'? false : infoPurchase.accommodation
    };
    const response = await api.post('/purchases', body, {
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
  };
};

import { toast } from 'react-toastify';
import api from './api';

export async function createEnroll(token) {
  try {
    const data = JSON.parse(localStorage.getItem('form'));
    const form = { name: data.name,
      cpf: data.cpf,
      birthday: data.birthday,
      phone: data.phone,
      address: {
        cep: data.cep,
        street: data.street,
        city: data.city,
        number: data.number,
        state: data.state,
        neighborhood: data.neighborhood,
        addressDetail: data.addressDetail }
    };
    const config =     { headers: { Authorization: `Bearer ${token}` } };
    const response = await  api.post('/enrollments', form, config);
    return response.data;
  }
  catch(err) {
    toast(err);
    return '';
  }
};

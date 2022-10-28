import api from './api';

export async function getHotels() {
  const response = await api.get('/hotels/');

  return response.data;
}
//

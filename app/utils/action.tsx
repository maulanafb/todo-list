

import axios from '../configs';

export function getData(url:any, token:any) {
  return axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

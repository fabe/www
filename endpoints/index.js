import axios from 'axios';
import config from '../config';

export const fetchUser = userId => {
  return axios
    .get(`${config.server}/api/user/${userId}`)
    .then(res => res.data)
    .catch(err => err.response.status);
};

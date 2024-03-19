import api from './api';

const baseUrl = `/car`;

const getCarsApi = async () => {
  return api.get(`${baseUrl}`);
};

export {
  getCarsApi,
};
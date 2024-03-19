import api from './api';

const baseUrl = `/auth`;

const signInApi = async ({ email, password }) => {
  return api.post(`${baseUrl}/sign-in`, { email, password });
};

const signUpApi = async ({ email, password, phoneNumber, firstname, lastname, age }) => {
  return api.post(`${baseUrl}/sign-up`, { email, password, phone_number: phoneNumber, firstname, lastname, age });
};

export {
  signInApi,
  signUpApi,
};
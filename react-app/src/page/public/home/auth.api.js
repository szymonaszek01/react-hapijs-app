import axios from 'axios';

const baseUrl = `http://localhost:5432/auth`;

const signInApi = async ({ email, password }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/sign-in`,
    data: { email, password },
  });
};

const signUpApi = async ({ email, password, phoneNumber, firstname, lastname, age }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/sign-up`,
    data: { email, password, phone_number: phoneNumber, firstname, lastname, age },
  });
};

export {
  signInApi,
  signUpApi,
};
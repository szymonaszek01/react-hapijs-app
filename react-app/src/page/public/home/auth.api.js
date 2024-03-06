import axios from 'axios';

const baseUrl = `http://localhost:5432/auth`;

const signInApi = async ({ email, password }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/sign-in`,
    data: { email, password },
  });
};

export {
  signInApi,
};
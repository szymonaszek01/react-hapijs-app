import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5432',
});

api.interceptors.request.use(function(request) {
  const token = sessionStorage.getItem('token');
  if (token) {
    request.headers['authorization'] = `Bearer ${token}`;
  }
  return request;
}, function(error) {
  return Promise.reject(error);
});

api.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response && error.response.status === 401) {
    const navigate = useNavigate();
    sessionStorage.removeItem('token');
    toast.info(`Your session expired. Sign in again.`);
    navigate('/');
  }
  return Promise.reject(error);
});

export default api;

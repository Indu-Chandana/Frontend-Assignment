import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const signup = (formData) => API.post('/user/signup', formData);
export const signin = (formData) => API.post('/user/signin', formData);
export const getAllUsers = () => API.get('/user');
export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, userData) => API.patch(`/user/${id}`, userData);
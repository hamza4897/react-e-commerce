
import axios from 'axios';

const apiUrl = 'http://localhost:3000/products';

export const getProducts = () => axios.get(apiUrl);
export const getProduct = (id) => axios.get(`${apiUrl}/${id}`);
export const createProduct = (product) => axios.post(apiUrl, product);
export const updateProduct = (id, product) => axios.put(`${apiUrl}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${apiUrl}/${id}`);

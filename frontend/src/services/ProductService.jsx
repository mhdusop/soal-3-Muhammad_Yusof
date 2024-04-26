import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/v1/"

export const getAllData = async () => {
   const response = await axios.get(`${API_URL}get/products`);
   return response.data.data;
};

export const createData = async (data) => {
   const response = await axios.post(`${API_URL}create/product`, data, {
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   });
   return response.data;
};

export const updateData = async (id, data) => {
   const formData = data instanceof FormData ? data : new FormData();

   if (!(data instanceof FormData)) {
      Object.keys(data).forEach(key => {
         formData.append(key, data[key]);
      });
   }

   // Append the method override
   formData.append('_method', 'PUT');
   const response = await axios.post(`${API_URL}update/product/${id}`, data, {
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   });
   return response.data;
};

export const deleteData = async (id) => {
   await axios.delete(`${API_URL}delete/product/${id}`);
};

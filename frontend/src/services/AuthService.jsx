import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

export const registerUser = async (userData) => {
   try {
      const response = await axios.post(`${API_URL}register`, userData);
      console.log(response);
      return response.data;
   } catch (error) {
      console.error('Registration error:', error.response);
      throw error;
   }
};

export const loginUser = async (userData) => {
   try {
      const response = await axios.post(`${API_URL}login`, userData);
      const { data } = response;
      if (data.success && data.token) {
         localStorage.setItem('userToken', data.token);
         return data;
      }
   } catch (error) {
      console.error('Login error:', error.response);
      throw error;
   }
};
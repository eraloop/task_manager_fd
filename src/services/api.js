
import axios from 'axios';
const BASE_URL = 'http://192.168.1.121:8080/api/'; 

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
        console.log(error.message, 'error')
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },


  put: async (endpoint, data) => {
    try {

      const response = await axios.put(`${BASE_URL}${endpoint}`, data);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },


  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`);
      console.log(response.status)
      return response.status;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },


};

export default apiService;

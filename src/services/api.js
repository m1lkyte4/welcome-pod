// src/services/api.js
import axios from 'axios';

const apiUrl = 'http://localhost:3000'; // Replace with your backend API URL

const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export { fetchData };

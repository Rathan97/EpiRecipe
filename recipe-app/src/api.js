import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update with your Django API URL

export const fetchRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes/`);
  return response.data;
};

export const searchRecipes = async (query) => {
  const response = await axios.get(`${API_URL}/search/?query=${query}`);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/recipes/${id}/`);
  return response.data;
};

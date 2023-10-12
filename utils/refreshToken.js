import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getURL } from './getURL';
import { Logout } from '../todoApp/LogoutButton';

const url = getURL(); // will return "https://taltech.akaver.com/api/v1/"

const refreshToken = async (refreshToken) => {
  try {
    // Make a request to the server to refresh the token
    const response = await api.post(`${url}Account/RefreshToken`, {
      refreshToken: refreshToken,
    });

    const newToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    // Store the new tokens in AsyncStorage or any storage mechanism of your choice
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);

    return newToken;
  } catch (error) {
    // Handle token refresh failure (e.g., log the user out)
    // Logout()
    throw error;
  }
};

// Create an Axios instance
const api = axios.create()
//   {
//   baseURL: "https://taltech.akaver.com/"
// });

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    // console.log("Succesfull response")
    // const currRefreshToken = await AsyncStorage.getItem("UserData.refreshToken")
    // console.log("RefreshToken: ", currRefreshToken)
    return response;
  },
  async (error) => {
    console.log(error)
    console.log("Response status: " , error.response.status )
    if (error.response.status === 401) {
      console.log("In 401 interceptor") 
      const prevRefreshToken = await AsyncStorage.getItem("token")
      console.log("prev token: " , prevRefreshToken)
      const newToken = await refreshToken(prevRefreshToken);
      console.log("new token: " , newToken)

      // Update the request's Authorization header with the new token
      error.config.headers['Authorization'] = `Bearer ${newToken}`;

      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default api;

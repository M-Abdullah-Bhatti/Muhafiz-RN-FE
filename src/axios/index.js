import axios from "axios";
import { API_BASE_URL } from "../configs/urls";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("jwt-token");

    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(function (config) {
  return config;
});

export default axiosInstance;

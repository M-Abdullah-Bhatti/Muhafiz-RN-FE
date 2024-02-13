import axios from "axios";
import { API_BASE_URL } from "../configs/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

let currentToken = null;

// Function to update the token
const updateToken = async () => {
  currentToken = await AsyncStorage.getItem("jwt-token");
};

axiosInstance.interceptors.request.use(async (config) => {
  if (!currentToken) await updateToken(); // Update token if not set
  config.headers["Authorization"] = currentToken
    ? `Bearer ${currentToken}`
    : "";
  return config;
});

axiosInstance.interceptors.response.use(function (config) {
  return config;
});

export default axiosInstance;

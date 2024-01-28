import axios from "axios";
import { BASE_URL } from "../helpers/variables";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.idToken;
  // config.params = config.params || {};
  // config.params["cookie"] = token;
  return config;
});

export default axiosInstance;

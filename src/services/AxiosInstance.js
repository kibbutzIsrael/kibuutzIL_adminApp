import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
   baseURL: `https://react-course-b798e-default-rtdb.firebaseio.com/`,
});

const authHeader = `Bearer ${localStorage.getItem("userDetailsSend")}`;

console.log("here", authHeader);

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//    "userDetailsSend"
// )}`;

axiosInstance.interceptors.request.use((config) => {
   const state = store.getState();
   const token = state.auth.auth.idToken;
   config.params = config.params || {};
   config.params["auth"] = token;
   return config;
});

export default axiosInstance;

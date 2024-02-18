import axios from "axios";

//sets Authorization header for all requests
axios.defaults.headers.common["Authorization"] = getAuthHeader();

async function fetchUsers(url) {
   return await axios.get(url);
}

async function createUser(url, body) {
   return await axios.post(`${url}`, body);
}

async function updateUser(url, id, body) {
   return await axios.put(`${url}/${id}`, body);
}

async function deleteUser(url, id) {
   return await axios.delete(`${url}/${id}`);
}

export function getAuthHeader() {
   const jwtToken = localStorage.getItem("userDetailsSend");
   if (!jwtToken) {
      console.error("JWT token not found in local storage");
      return;
   }

   const sanitizedToken = jwtToken.replace(/["']/g, ""); // Remove both single and double quotes
   console.log(`Bearer ${sanitizedToken}`);
   return `Bearer ${sanitizedToken}`;
}

export { fetchUsers, createUser, deleteUser, updateUser };

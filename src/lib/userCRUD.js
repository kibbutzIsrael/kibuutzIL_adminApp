import axios from "axios";

async function fetchUsers(url) {
   const fetchUsers = fetch(url)
      .then((res) => res.json())
      .catch((error) =>
         console.error("Error making the GET request:", error.message)
      );
   return await fetchUsers;
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

export { fetchUsers, createUser, deleteUser, updateUser };

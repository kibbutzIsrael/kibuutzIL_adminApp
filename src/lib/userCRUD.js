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
  try {
    const jwtToken = localStorage.getItem("userDetailsSend");
    if (!jwtToken) {
      console.error("JWT token not found in local storage");
      return;
    }

    const sanitizedToken = jwtToken.replace(/["']/g, ""); // Remove both single and double quotes

    return await axios.delete(`${url}/${id}`, {
      headers: {
        authorization: `Bearer ${sanitizedToken}`, // Include the "Bearer" prefix here
      },
    });
  } catch (error) {
    console.error(error.response.data);
  }
}

export { fetchUsers, createUser, deleteUser, updateUser };

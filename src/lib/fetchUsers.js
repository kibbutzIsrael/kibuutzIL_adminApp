async function fetchUsers(url) {
   const fetchUsers = fetch(url)
      .then((res) => res.json())
      .catch((error) =>
         console.error("Error making the GET request:", error.message)
      );
   return await fetchUsers;
}

export { fetchUsers };

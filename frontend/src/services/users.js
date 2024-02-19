const baseURL = import.meta.env.VITE_BACKEND_URL;

const getCurrentUser = () => {
  return fetch(`${baseURL}/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};

export default { getCurrentUser };

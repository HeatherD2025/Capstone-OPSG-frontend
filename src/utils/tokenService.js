// stores token in client browser
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// returns token in client browser
export const getToken = () => {
  return localStorage.getItem("token");
};

// delete user token from client browser
export const removeToken = () => {
  return localStorage.removeItem("token");
};

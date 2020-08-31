import axios from "axios";
export const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken; //Attach Authorization header for all axios requests
};

export const removeAuthorizationHeader = () => {
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["Authorization"];
};

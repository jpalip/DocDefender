import axios from "axios";

export function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    return { "x-access-token": token };
  } else {
    return {};
  }
}

export function logout() {
  localStorage.removeItem("token");
}

function loginRegister(username, password, type) {
  return axios
    .post(`http://localhost:8393/${type}`, { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response;
    });
}

export function loginUser(username, password) {
  return loginRegister(username, password, "login");
}

export function registerUser(username, password) {
  return loginRegister(username, password, "register");
}

export function getImages() {
  return axios
    .get("http://localhost:8393/images", {
      headers: authHeader(),
    })
    .catch((error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        return { success: false };
      }
    })
    .then((response) => {
      return response;
    });
}

export function loggedIn() {
  return localStorage.getItem("token") !== null;
}

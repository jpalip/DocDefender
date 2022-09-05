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

export function login(username, password) {
  return loginRegister(username, password, "login");
}

export function register(username, password) {
  return loginRegister(username, password, "register");
}

function loginRegister(username, password, type) {
  return axios.post(`/${type}`, { username, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  });
}

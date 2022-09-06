import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate();

  function authHeader() {
    const token = localStorage.getItem("token");

    if (token) {
      return { "x-access-token": token };
    } else {
      return {};
    }
  }

  function logoutUser() {
    localStorage.removeItem("token");
    navigate("/sign-in");
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

  function loginUser(username, password) {
    return loginRegister(username, password, "login");
  }

  function registerUser(username, password) {
    return loginRegister(username, password, "register");
  }

  function handleErrorResponse(error) {
    if (error.response.status === 401 || error.response.status === 403) {
      logoutUser();
    }

    return error;
  }

  function getImages() {
    return axios
      .get("http://localhost:8393/images", {
        headers: authHeader(),
      })
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
  }

  function authed() {
    return localStorage.getItem("token") !== null;
  }

  function useRedirectIfAuthed(href) {
    useEffect(() => {
      if (authed()) {
        navigate(href);
      }
    });
  }

  function useRedirectIfNotAuthed(href) {
    useEffect(() => {
      if (!authed()) {
        navigate(href);
      }
    });
  }

  return {
    authed,
    useRedirectIfAuthed,
    useRedirectIfNotAuthed,
    loginUser,
    registerUser,
    logoutUser,
    getImages,
  };
};

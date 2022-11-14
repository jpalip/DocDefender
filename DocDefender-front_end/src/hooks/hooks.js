import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8393"
    : "https://www.api.docdefender.org";

const useAuth = () => {
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
    window.location.reload();
  }

  async function addUserToFile(username, filename) {
    const { data } = await axios
      .post(
        `${API_URL}/addUserToFile`,
        { username, filename },
        {
          headers: authHeader(),
        }
      )
      .catch(handleErrorResponse);

    return data;
  }

  async function deleteFile(fileId) {
    const { data } = await axios
      .post(
        `${API_URL}/deleteFile`,
        {
          fileId,
        },
        {
          headers: authHeader(),
        }
      )
      .catch(handleErrorResponse);

    return data;
  }

  async function deleteUser(username) {
    const { data } = await axios
      .post(
        `${API_URL}/deleteUser`,
        {
          username,
        },
        {
          headers: authHeader(),
        }
      )
      .catch(handleErrorResponse);

    return data;
  }

  async function register(email, username, password, type) {
    const { data } = await axios.post(`${API_URL}/${type}`, {
      email,
      username,
      password,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }

  async function login(username, password, type) {
    const { data } = await axios.post(`${API_URL}/${type}`, {
      username,
      password,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }

  async function uploadFile(selectedFile) {
    let formData = new FormData();
    formData.append("file", selectedFile);

    const { data } = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  async function searchUser(username) {
    const { data } = await axios.get(
      `${API_URL}/searchUser?username=${username}`
    );

    return data;
  }

  async function searchFile(title) {
    const { data } = await axios.get(
      `${API_URL}/searchFile?filename=${title}`,
      {
        headers: authHeader(),
      }
    );

    return data;
  }

  async function loginUser(username, password) {
    return await login(username, password, "login");
  }

  async function registerUser(email, username, password) {
    return await register(email, username, password, "register");
  }

  function handleErrorResponse(error) {
    if (error.response && error.response.status === 403) {
      logoutUser();
    }

    return error;
  }

  async function getUsername() {
    const { data } = await axios
      .get(`${API_URL}/getUsername`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse);

    return data.username;
  }

  async function requestView(filename, fileId) {
    const { data } = await axios
      .get(`${API_URL}/requestView`, {
        headers: authHeader(),
        params: {
          filename,
          fileId,
        },
      })
      .catch(handleErrorResponse);

    return data;
  }

  async function getFiles() {
    const { data } = await axios
      .get(`${API_URL}/files`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse);

    return data;
  }

  async function getUsers() {
    const { data } = await axios
      .get(`${API_URL}/users`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse);

    return data;
  }

  function authed() {
    return localStorage.getItem("token") !== null;
  }

  async function isAdmin() {
    const { data } = await axios
      .get(`${API_URL}/isAdmin`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse);

    return data.isAdmin;
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
    getFiles,
    getUsers,
    getUsername,
    isAdmin,
    searchUser,
    searchFile,
    uploadFile,
    addUserToFile,
    deleteFile,
    deleteUser,
    requestView,
  };
};

export default useAuth;

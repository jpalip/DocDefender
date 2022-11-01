import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

// const [ip, setIP] = useState("");

// //creating function to load ip address from the API
// const getData = async () => {
//   const res = await axios.get("https://geolocation-db.com/json/");
//   console.log(res.data);
//   setIP(res.data.IPv4);
// };

// useEffect(() => {
//   //passing getData method to the lifecycle method
//   getData();
// }, []);

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

  function addUserToFile(username, filename) {
    return axios
      .post(
        `${API_URL}/addUserToFile`,
        { username, filename },
        {
          headers: authHeader(),
        }
      )
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
  }

  function deleteFile(fileId) {
    return axios
      .post(
        `${API_URL}/deleteFile`,
        {
          fileId,
        },
        {
          headers: authHeader(),
        }
      )
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
  }

  function register(email, username, password, ip, type) {
    return axios
      .post(`${API_URL}/${type}`, { email, username, password, ip })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        return response;
      });
  }

  function login(username, password, type) {
    return axios
      .post(`${API_URL}/${type}`, { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        return response;
      });
  }

  function uploadFile(selectedFile) {
    let formData = new FormData();
    formData.append("file", selectedFile);
    return axios
      .post(`${API_URL}/upload`, formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((response) => {
        return response;
      });
  }

  function searchUser(username) {
    return axios
      .get(`${API_URL}/searchUser?username=${username}`)
      .then((response) => {
        return response;
      });
  }

  function searchFile(title) {
    return axios
      .get(`${API_URL}/searchFile?filename=${title}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      });
  }

  function loginUser(username, password) {
    return login(username, password, "login");
  }

  function registerUser(email, username, password, ip) {
    return register(email, username, password, ip, "register");
  }

  function handleErrorResponse(error) {
    if (error.response && error.response.status === 401) {
      logoutUser();
    }

    return error;
  }

  function getUsername() {
    return axios
      .get(`${API_URL}/getUsername`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
  }

  function requestView(filename, fileId) {
    return axios
      .get(`${API_URL}/requestView`, {
        headers: authHeader(),
        params: {
          filename,
          fileId,
        },
      })
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
  }

  function getFiles() {
    return axios
      .get(`${API_URL}/files`, {
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

  function isAdmin(username) {
    return axios
      .get(`${API_URL}/isAdmin?=${username}`, {
        headers: authHeader(),
      })
      .catch(handleErrorResponse)
      .then((response) => {
        return response;
      });
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
    getUsername,
    isAdmin,
    searchUser,
    searchFile,
    uploadFile,
    addUserToFile,
    deleteFile,
    requestView,
  };
};

export default useAuth;

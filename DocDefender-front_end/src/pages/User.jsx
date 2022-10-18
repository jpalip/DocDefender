import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";
import moment from "moment";

export default function User() {
  const [files, setFiles] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [fileMatches, setFileMatches] = useState([]);
  const [usernameDisabled, setUsernameDisabled] = useState(false);
  const [filenameDisabled, setFilenameDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [filenameField, setFilenameField] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [showUserbox, setShowUserbox] = useState(false);
  const [showFilebox, setShowFilebox] = useState(false);

  const {
    useRedirectIfNotAuthed,
    getFiles,
    searchUser,
    searchFile,
    uploadFile,
    deleteFile,
    addUserToFile,
    authed,
    requestView,
  } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    if (authed()) {
      getFiles().then((r) => {
        if (r.data.success) {
          setFiles(r.data.success);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const fileUpload = (e) => {
    e.preventDefault();

    if (e.target[0].files.length < 1) {
      return alert("Please select a file");
    }
    uploadFile(e.target[0].files[0]).then((r) => {
      if (r.data.error) {
        alert(r.data.error);
      } else if (r.data.success) {
        alert(r.data.success);
        window.location.reload(false);
      }
    });
  };

  const reqView = (...params) => {
    requestView(params[0], params[1]).then((r) => {
      if (r.data.success) {
        alert(r.data.success);
        console.log("no error");
      }
      console.log("error");
    });
    window.location.reload(false);
  };

  const confirmAddUserToFile = () => {
    // if (!username || !filename) {
    //   return alert("Error: Missing user or filename selection");
    // }
    // addUser;
  };

  const onDeleteFile = (id) => {
    deleteFile(id).then((r) => {
      if (r.data.error) {
        alert(r.data.error);
      } else if (r.data.success) {
        alert(r.data.success);
        window.location.reload(false);
      }
    });
  };

  const onChangeUsers = (e) => {
    setUsernameField(e.target.value);

    if (!e.target.value.trim()) {
      setShowUserbox(false);
      return setUserMatches([]);
    }

    searchUser(e.target.value).then((r) => {
      setUserMatches(r.data.success);
    });

    setShowUserbox(true);
  };

  const onChangeFiles = (e) => {
    setFilenameField(e.target.value);

    if (!e.target.value.trim()) {
      setShowFilebox(false);
      return setFileMatches([]);
    }

    searchFile(e.target.value).then((r) => {
      setFileMatches(r.data.success);
    });

    setShowFilebox(true);
  };

  // Function to lock text box after file selection
  const disableFileSelection = (filename) => {
    setFilenameField(filename);
    setFilenameDisabled(true);
    setSelectedFile(filename);
    setFileMatches([]);
    setShowFilebox(false);
  };

  const disableUserSelection = (username) => {
    setUsernameField(username);
    setUsernameDisabled(true);
    setSelectedUser(username);
    setUserMatches([]);
    setShowUserbox(false);
  };

  const resetSelection = (e) => {
    e.preventDefault();
    setFilenameDisabled(false);
    setUsernameDisabled(false);
    setSelectedFile("");
    setSelectedUser("");
    setUsernameField("");
    setFilenameField("");
  };

  return (
    <div>
      <div
        style={{ marginTop: "5%" }}
        id="header"
        className="p-5 text-center bg-light"
      >
        <h2 className="mb-3">File Vault</h2>
      </div>
      <div className="files">
        <h5>Upload a file here to encrypt: </h5>
        <p style={{ color: "#656464" }}>
          Supported File Types:
          <br />
          (PDF, JPEG/JPG, GIF, SVG, MP4, MOV, AVI, DOC, DOCX, TXT, HTML, XLS,
          XLSX, ADCHD, PPT, PPTX, MP3, M4A, WAV, ZIP, EXE, JAR + more)
        </p>
        <form useref="uploadForm" id="uploadForm" onSubmit={fileUpload}>
          <input
            id="input-b3"
            name="input-b3[]"
            type="file"
            className="file"
            multiple
            data-show-upload="false"
            data-show-caption="true"
            data-msg-placeholder="Select {files} for upload..."
          />
          <button className="btn btn-success">Encrypt</button>
        </form>
        <br />
        <br />
        <h5>Search Files and Users to Share Access:</h5>
        <form>
          <div
            style={{ marginLeft: "30%", marginRight: "30%" }}
            className="form-floating mb-3"
          >
            <input
              onChange={onChangeFiles}
              disabled={filenameDisabled}
              value={filenameField}
              type="title"
              id="title"
              autoComplete="ie-title"
              className="form-control"
            />
            <label className="form-control1" htmlFor="filename">
              Filename{" "}
            </label>
          </div>
          <div
            style={{ marginLeft: "30%", marginRight: "30%" }}
            className="form-floating mb-3"
          >
            <input
              onChange={onChangeUsers}
              disabled={usernameDisabled}
              value={usernameField}
              type="username"
              id="username"
              autoComplete="ie-username"
              className="form-control"
            />
            <label className="form-control1" htmlFor="username">
              Username{" "}
            </label>
          </div>
        </form>
        <button className="btn btn-dark" onClick={resetSelection}>
          Reset Selections
        </button>
        <div className="parentList">
          {showFilebox && (
            <div
              style={{
                color: "white",
                marginLeft: "20%",
                width: "30%",
                float: "left",
              }}
              className="childList card bg-dark bg-gradient mb-3"
              id="fileSelection"
            >
              {fileMatches.map((el, i) => (
                <div key={i}>
                  {el.title} &nbsp;
                  <button
                    style={{ padding: "5px" }}
                    className="btn btn-secondary"
                    onClick={() => disableFileSelection(el.title)}
                  >
                    Select
                  </button>
                  <br />
                </div>
              ))}
            </div>
          )}
          {showUserbox && (
            <div
              style={{
                color: "white",
                marginRight: "20%",
                width: "30%",
                float: "right",
              }}
              className="childList card bg-dark bg-gradient mb-3"
              id="userSelection"
            >
              {userMatches.map((el, i) => (
                <div key={i}>
                  {el.username} &nbsp;
                  <button
                    style={{ padding: "5px" }}
                    className="btn btn-secondary"
                    onClick={() => disableUserSelection(el.username)}
                  >
                    Add
                  </button>
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
        <div style={{ margin: "auto", width: "40%" }} className="bg-light mb-3">
          <h5 id="selectedFile">
            Selected File: <b>{selectedFile}</b>
          </h5>
        </div>
        <div style={{ margin: "auto", width: "40%" }} className="bg-light mb-3">
          <h5 id="selectedUser">
            Selected User: <b>{selectedUser}</b>
          </h5>
        </div>
        <br />
        <button className="btn btn-primary" onClick={addUserToFile}>
          Confirm Upload
        </button>
        <br />
        <br />
        <h5>Your files will be displayed below:</h5>
        <hr />
        {files.map((file, i) => (
          <div className="container" key={i}>
            <h2>{file.title || "Untitled"}</h2>
            <div className="image-list">
              <img
                className="displayed-files"
                src={file.url}
                alt={file.title}
              />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={() => reqView(file.title, file.id)}
                className="btn btn-primary"
              >
                Request View
              </button>
              <button
                onClick={() => onDeleteFile(file.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
        <h5>Transaction Log:</h5>
        {files
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((file) => (
            <div className="container" key={file.createdAt}>
              <h2>
                {file.title || "Untitled"} <b>|</b> Date:{" "}
                {moment(file.createdAt).format("MM/DD/YY HH:mm:ss")}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}

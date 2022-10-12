import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";

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
      }
    });
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
      <h1>
        <u>File Vault</u>
      </h1>
      <div className="files">
        <br />
        <h5>Upload a file here to encrypt: </h5>
        <p>(PDF, JPEG/JPG, or PNG)</p>
        <br />
        <br />
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
            <label htmlFor="filename">Filename </label>
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
            <label htmlFor="username">Username </label>
          </div>
        </form>
        <button className="btn btn-dark" onClick={resetSelection}>
          Reset Selections
        </button>
        <br />
        <br />
        <div className="parentLists">
          {showFilebox && (
            <div className="childList" id="fileSelection">
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
                </div>
              ))}
            </div>
          )}
          {showUserbox && (
            <div className="childList" id="userSelection">
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
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
        <div>
          <p id="selectedFile">
            Selected File: <b>{selectedFile}</b>
          </p>
        </div>
        <div>
          <p id="selectedUser">
            Selected User: <b>{selectedUser}</b>
          </p>
        </div>
        <br />
        <button className="btn btn-primary" onClick={addUserToFile}>
          Confirm Upload
        </button>
        <br />
        <br />
        <h5>Your files will be displayed below:</h5>
        <br></br>
        <br />
        <br />
        {files.map((image, i) => (
          <div className="container" key={i}>
            <h2>{image.title || "Untitled"}</h2>
            <br />
            <div className="image-list">
              <img src={image.url} alt={image.title} />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={() => onDeleteFile(image.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

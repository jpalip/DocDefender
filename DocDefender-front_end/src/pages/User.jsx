import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";
import moment from "moment";
import FilePreview from "../components/FilePreview";

const UNKNOWN_ERR = "Unknown error occurred";

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
      (async () => {
        const files = (await getFiles()).success;
        files && setFiles(files);
      })();
    }
  }, [getFiles, files, authed]);

  const fileUpload = async (e) => {
    e.preventDefault();

    if (e.target[0].files.length < 1) {
      return alert("Please select a file");
    }

    const { success, error } = await uploadFile(e.target[0].files[0]);

    alert(success || error || UNKNOWN_ERR);
  };

  const reqView = async (...params) => {
    const { success, error } = await requestView(params[0], params[1]);

    success && window.location.reload();
    error && alert(error);
  };

  const confirmAddUserToFile = async (...params) => {
    const { success } = await addUserToFile(params[0], params[1]);

    alert(success || UNKNOWN_ERR);
    success && resetSelection();
  };

  const onDeleteFile = async (id) => {
    const { success, error } = await deleteFile(id);

    if (success) {
      alert(success);
      window.location.reload();
    }
    error && alert(error);
  };

  const onChangeUsers = async (e) => {
    setUsernameField(e.target.value);

    if (!e.target.value.trim()) {
      setShowUserbox(false);
      return setUserMatches([]);
    }

    const { success } = await searchUser(e.target.value);

    if (success) {
      setUserMatches(success);
      setShowUserbox(true);
    }
  };

  const onChangeFiles = async (e) => {
    setFilenameField(e.target.value);

    if (!e.target.value.trim()) {
      setShowFilebox(false);
      return setFileMatches([]);
    }

    const { success } = await searchFile(e.target.value);

    if (success) {
      setFileMatches(success);
      setShowFilebox(true);
    }
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
    if (e) {
      e.preventDefault();
    }
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
        style={{ marginTop: "2%" }}
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
        <button
          className="btn btn-primary"
          onClick={() => confirmAddUserToFile(selectedUser, selectedFile)}
        >
          Confirm Add
        </button>
        <br />
        <br />
        <h5>Your files will be displayed below:</h5>
        <p>
          NOTE: You must request a view first, to be able to successfully
          download your files.
        </p>
        <hr />
        {files.map((file, i) => (
          <div className="container" key={i}>
            <h2>{file.title || "Untitled"}</h2>
            <div className="image-list">
              <FilePreview
                className="displayed-files"
                src={file.url}
                alt={file.title}
              />
            </div>
            <div>
              <button
                onClick={() => reqView(file.title, file.id)}
                className="btn btn-primary file-action-btns"
              >
                View
              </button>
              <a
                className="btn btn-primary file-action-btns"
                href={file.url}
                download={file.title}
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
              <button
                onClick={() => onDeleteFile(file.id)}
                className="btn btn-danger file-action-btns"
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

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
    addUserToFile,
  } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    getFiles().then((r) => {
      if (r.data) {
        setFiles(r.data);
      }
    });
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

  const deleteFile = (id) => {};

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
          <input type="file" />
          <input type="submit" value="Encrypt" />
        </form>
        <br />
        <br />
        <h5>Search Files and Users to Share Access:</h5>
        <form>
          <div className="form-control">
            <label htmlFor="username">Filename: </label>
            <input
              onChange={onChangeFiles}
              disabled={filenameDisabled}
              value={filenameField}
              type="title"
              id="title"
              autoComplete="ie-title"
            />
            <label htmlFor="username">Username: </label>
            <input
              onChange={onChangeUsers}
              disabled={usernameDisabled}
              value={usernameField}
              type="username"
              id="username"
              autoComplete="ie-username"
            />
            <button onClick={resetSelection}>Reset Selections</button>
            {/*<button onClick={disableUserSelection}>Add User</button>*/}
          </div>
        </form>
        <div className="parentLists">
          {showFilebox && (
            <div className="childList" id="fileSelection">
              {fileMatches.map((el, i) => (
                <div key={i}>
                  {el.title}
                  <button onClick={() => disableFileSelection(el.title)}>
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
                  {el.username}
                  <button onClick={() => disableUserSelection(el.username)}>
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
        <button onClick={addUserToFile}>Confirm</button>
        <br />
        <br />
        <h5>Your documents will be displayed here:</h5>
        <br></br>
        <br />
        <br />
        {files.map((image, i) => (
          <div className="container" key={i}>
            <h2>{image.title || "Untitled"}</h2>
            <br />
            <div className="image-list">
              <img src={image.url} alt={image.title} />
            </div>
            <div className="overlay">
              <div className="text">test text</div>
            </div>
            <button onClick={deleteFile} className="delete-file">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

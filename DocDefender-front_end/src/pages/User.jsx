import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";

export default function User() {
  const [images, setImages] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [fileMatches, setFileMatches] = useState([]);
  //const [file, setFile] = useState();

  const {
    useRedirectIfNotAuthed,
    getImages,
    searchUser,
    searchFile,
    uploadFile,
  } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    getImages().then((r) => {
      if (r.data) {
        setImages(r.data);
      }
    });
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

  const onChangeUsers = (e) => {
    if (!e.target.value.trim()) {
      return setUserMatches([]);
    }

    searchUser(e.target.value).then((r) => {
      setUserMatches(r.data.success);
    });
  };

  const onChangeFiles = (e) => {
    if (!e.target.value.trim()) {
      return setFileMatches([]);
    }

    searchFile(e.target.value).then((r) => {
      setFileMatches(r.data.success);
    });
  };

  return (
    <div>
      <h1>
        <u>File Vault</u>
      </h1>
      <div className="images">
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
            <input onChange={onChangeFiles} type="text" />
            <label htmlFor="username">Username: </label>
            <input
              onChange={onChangeUsers}
              type="username"
              id="username"
              autoComplete="ie-username"
            />
            <button>Add User</button>
          </div>
        </form>
        <div className="parentLists">
          <div className="childList">
            {fileMatches.map((el, i) => (
              <div key={i}>
                {el.title}
                <button>Select</button>
              </div>
            ))}
          </div>
          <div className="childList">
            {userMatches.map((el, i) => (
              <div key={i}>
                {el.username}
                <button>Add</button>
              </div>
            ))}
          </div>
        </div>
        <br />
        <p className="form-control">
          Selected File: {}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Selected User(s): {}
        </p>
        <button>Confirm</button>
        <br />
        <br />
        <h5>Your documents will be displayed here:</h5>
        <br></br>
        {/*<img id="image" src={file} />*/}
        <br />
        <br />
        {images.map((image, i) => (
          <div className="container" key={i}>
            <h2>{image.title || "Untitled"}</h2>
            <br />
            <div className="image-list">
              <img src={image.url} alt={image.title} />
            </div>
            <div className="overlay">
              <div className="text">test text</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

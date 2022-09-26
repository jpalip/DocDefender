import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";
import Button from "react-bootstrap/Button";
import { ThemeConsumer } from "styled-components";

export default function User() {
  const [images, setImages] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [fileMatches, setFileMatches] = useState([]);
  const [file, setFile] = useState();

  const { useRedirectIfNotAuthed, getImages, searchUser, searchFile } =
    useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    getImages().then((r) => {
      if (r.data) {
        setImages(r.data);
      }
    });
  }, []);

  const onChangeUsers = (e) => {
    if (!e.target.value.trim()) {
      return setUserMatches([]);
    }

    searchUser(e.target.value).then((r) => {
      setUserMatches(r.data.success);
    });
  };


  const fileCheck = (e) => {
      if (document.getElementById("my_file").value){
        window.alert('File successfully encrypted')
      }
      else {
        window.alert('Please select a file')
      }
      e.preventDefault();
  };

  
  const fileUpload = (e) => {
    switch(e.target.files[0].type) {
      case "image/jpeg":
      case "image/png":
        handleImage(e);
        break;
      case "application/pdf":
        break;

      default:
        window.alert('Incorrect File Type')
        document.getElementById("my_file").value = null;
        document.getElementById("image").src = null;
    }
};

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

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
        <form>
            <input type="file"  name="file_upload" id="my_file" onChange={fileUpload}/>
            <button onClick={fileCheck}>Encrypt</button>
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
              <img id="image" src={file}/>
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

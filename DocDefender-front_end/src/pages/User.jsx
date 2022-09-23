import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";
import Button from "react-bootstrap/Button";

export default function User() {
  const [images, setImages] = useState([]);
  const [matches, setMatches] = useState([]);

  const { useRedirectIfNotAuthed, getImages, searchUser } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    getImages().then((r) => {
      if (r.data) {
        setImages(r.data);
      }
    });
  }, []);

  const onChange = (e) => {
    if (!e.target.value.trim()) {
      return setMatches([]);
    }

    searchUser(e.target.value).then((r) => {
      setMatches(r.data.success);
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
        <br />
        <br />
        <form>
          <input type="file" id="myFile" name="filename" />
          <input type="submit" />
        </form>
        <br />
        <br />
        <h5>Enter Filename and Search User to add:</h5>
        <form>
          <div className="form-control">
            <label htmlFor="username">Username: </label>
            <input
              onChange={onChange}
              type="username"
              id="username"
              autoComplete="ie-username"
            />
            <label htmlFor="username">Filename: </label>
            <input type="text" />
          </div>
        </form>
        {matches.map((el, i) => (
          <div key={i}>
            {el.username}
            <button>Add</button>
          </div>
        ))}
        <br />
        <br />
        <h5>Your encrypted documents will be displayed here: </h5>
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

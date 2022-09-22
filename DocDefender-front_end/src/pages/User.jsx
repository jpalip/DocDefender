import { useEffect, useState } from "react";
import { useAuth } from "../hooks/hooks";

export default function User() {
  const [images, setImages] = useState([]);

  const { useRedirectIfNotAuthed, getImages } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    getImages().then((r) => {
      if (r.data) {
        setImages(r.data);
      }
    });
  }, [getImages]);

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
        <h5>Search for a user to give access to:</h5>
        <br />
        <div>
          <input type="text" placeholder="Search for user..." />
        </div>
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

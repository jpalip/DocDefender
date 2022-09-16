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
  });

  return (
    <div>
      <h1><u>File Vault</u></h1>
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
        <br />
        <h5>Your encrypted documents will be displayed here: </h5>
        <br />
        <br />
        {images.map((image, i) => (
          <div className="image" key={i}>
            <h2>{image.title || "Untitled"}</h2>
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

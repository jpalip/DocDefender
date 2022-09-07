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
      <h1>Images</h1>
      <div className="images">
        <br />
        <p>Upload a file here to encrypt: </p>
        <form>
          <input type="file" id="myFile" name="filename" />
          <input type="submit" />
        </form>
        <br />
        <br />
        <br />
        <p>Your encrypted documents will be displayed here: </p>
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

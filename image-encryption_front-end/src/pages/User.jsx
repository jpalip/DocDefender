import { getImages, loggedIn } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!loggedIn()) {
      navigate("/sign-in");
    }

    getImages().then((r) => {
      if (r.data) {
        setImages(r.data);
      } else {
        navigate("/sign-in");
      }
    });
  }, [navigate]);

  return (
    <div>
      <h1>Images</h1>
      <div className="images">
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

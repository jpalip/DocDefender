import { useState } from "react";

const FilePreview = ({ src, alt }) => {
  const checkFileType = () => alt.split(".").pop();

  const [fileType, setFileType] = useState(checkFileType());

  const matches = (type) => fileType === type;

  return (
    <div>
      {(matches("png") ||
        matches("jpg") ||
        matches("jpeg") ||
        matches("gif")) && <img width="80%" src={src} alt={alt}></img>}
      {matches("pdf") && (
        <object
          height="1000px"
          width="1000px"
          data={src}
          type="application/pdf"
        >
          <embed src={src} type="application/pdf" />
        </object>
      )}
      {matches("txt") && <iframe src={src} type="text/html" />}
    </div>
  );
};

export default FilePreview;

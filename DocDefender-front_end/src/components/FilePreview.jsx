const FilePreview = ({ src, alt }) => {
  const checkFileType = () => alt.split(".").pop().toLowerCase();

  const matches = (types) => types.includes(checkFileType());

  return (
    <div>
      {(matches(["jpg", "jpeg", "png", "gif"]) && (
        <img width="80%" src={src} alt={alt}></img>
      )) ||
        (matches(["pdf", "txt", "csv", "pptx", "docx", "doc"]) && (
          <iframe
            height="1000px"
            width="1000px"
            title="Title"
            src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
              src
            )}`}
            type="application/pdf"
            sandbox="allow-scripts allow-same-origin"
          />
        )) ||
        (matches(["mov", "mp4"]) && (
          <video controls>
            <source src={src} />
          </video>
        )) ||
        (matches(["html"]) && (
          <iframe title="Title" type="text/html" src={src} />
        )) || <p>Cannot display file</p>}
    </div>
  );
};

export default FilePreview;

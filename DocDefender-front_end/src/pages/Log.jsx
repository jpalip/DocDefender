import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";
import moment from "moment";

export default function Log(){
    const [files, setFiles] = useState([]);
    const {
      useRedirectIfNotAuthed,
      getFiles,
      authed,
    } = useAuth();
    useRedirectIfNotAuthed("/sign-in");
    useEffect(() => {
      if (authed()) {
        getFiles().then((r) => {
          if (r.data.success) {
            setFiles(r.data.success);
          }
        });
      }
      // eslint-disable-next-line
    }, []);
    
    return (
      <div id="page-container">
        <section className="bg-light py-5 border-bottom">
          <h2 className="fw-normal">Transaction Log</h2>
          <p className="lead mb-0">A record of all of your uploaded
          files can be found here</p>
          <br/>
          <br/>
        {files
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((file) => (
            <div className="container" key={file.createdAt}>
              <h3 className="fw-normal">
                {file.title || "Untitled"} <b>|</b> Date Added:{" "}
                {moment(file.createdAt).format("MM/DD/YY HH:mm:ss")}
              </h3>
            </div>
          ))}
          </section>
          <footer id="footer">&#169;DocDefender 2022</footer>
        </div>
    );
}
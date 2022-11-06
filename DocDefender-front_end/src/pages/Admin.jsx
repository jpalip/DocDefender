import { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";

export default function About() {
  const [users, setUsers] = useState([]);

  const { useRedirectIfNotAuthed, getUsers, authed } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    if (authed()) {
      getUsers().then((r) => {
        if (r.data.success) {
          setUsers(r.data.success);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {users.map((file, i) => (
        <div className="container" key={i}>
          <h2>
            Username: {users[i].username || "N/A"} | Admin:{" "}
            {users[i].admin || "N/A"}
          </h2>
          <hr />
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import useAuth from "../hooks/hooks";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const { useRedirectIfNotAuthed, getUsers, authed } = useAuth();
  useRedirectIfNotAuthed("/sign-in");

  useEffect(() => {
    if (authed()) {
      (async () => {
        const users = (await getUsers()).success;
        users && setUsers(users);
      })();
    }
  }, [getUsers, users, authed]);

  return (
    <div>
      <table className="admin-panel">
        <tbody>
          <tr className="admin-panel">
            <th></th>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>IP Address</th>
            <th>Admin</th>
          </tr>
          {users.map((user, i) => (
            <React.Fragment key={i}>
              <tr className="admin-panel">
                <td>
                  <input type="radio" name="" value="2" />
                </td>
                <td>{user.id} </td>
                <td>{user.email} </td>
                <td>{user.username} </td>
                <td>{user.ipAddr}</td>
                <td>{user.admin ? "✔" : "✘"} </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr />
      <button style={{ margin: "1px" }} className="btn btn-danger">
        Delete User
      </button>
      <button style={{ margin: "1px" }} className="btn btn-danger">
        Ban User
      </button>
      <button style={{ margin: "1px" }} className="btn btn-danger">
        Disable Upload{" "}
      </button>
    </div>
  );
}

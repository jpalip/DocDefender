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
      <table className="admin-panel">
        <tr className="admin-panel">
          <th></th>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>IP Address</th>
          <th>Admin</th>
        </tr>
        {users.map((user, i) => (
          <>
            <tr className="admin-panel">
              <td>
                <input type="radio" name="" value="2" />
              </td>
              <td>{user.id} </td>
              <td>{user.email} </td>
              <td>{user.username} </td>
              <td>{user.ipAddr}</td>
              <td>{user.admin} </td>
            </tr>
          </>
        ))}
      </table>
      <hr />
      <button>Delete User</button>
      <button>Ban User</button>
    </div>
  );
}

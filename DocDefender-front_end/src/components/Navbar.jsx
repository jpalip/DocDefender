import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/hooks";

export default function Navbar() {
  const { getUsername, authed, logoutUser } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername().then((r) => {
      if (r.data) {
        setUsername(r.data.username);
      }
    });
  }, []);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        DocDefender
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/user">Account</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        {authed() || <CustomLink to="/sign-in">Sign In</CustomLink>}
        {authed() && (
          <Button variant="primary" onClick={logoutUser}>
            Logout: {username}
          </Button>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { loggedIn, logout } from "../api";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Image Encryption
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/sign-in">Sign In</CustomLink>
        {loggedIn() && (
          <Button
            variant="primary"
            onClick={() => {
              logout();
              navigate(0);
            }}
          >
            Logout
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

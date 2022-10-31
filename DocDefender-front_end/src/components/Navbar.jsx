import { useState, useEffect } from "react";
import useAuth from "../hooks/hooks";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./icon.png";

export default function Taskbar() {
  const { getUsername, authed, logoutUser, isAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!authed()) {
      return;
    }
    getUsername().then((r) => {
      if (r.data) {
        setUsername(r.data.username);
      }
    });
    isAdmin(username).then((r) => {
      setAdmin(r.data.isAdmin);
    });
  }, [getUsername, isAdmin, username, authed]);

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      expand="lg"
      className="sticky-top"
    >
      <Container>
        <Navbar.Brand className="fs-3" href="/">
          <img
            alt=""
            src={logo}
            width="50"
            height="45"
            className="d-inline-block align-top"
          />{" "}
          DocDefender
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto fs-4">
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown
            title="My Files"
            id="collasible-nav-dropdown"
            className="dropdown-menu-dark">
              <NavDropdown.Item href="/user">File Vault</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/log">
                Transaction Log
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          {admin || <></>}
            {admin && (
              <Nav.Link
                className="btn btn-danger"
                style={{
                  color: "white",
                }}
                href="/admin"
              >
                Admin
              </Nav.Link>
            )}
            <div></div>
            {authed() || <Nav.Link className="fs-4" href="/sign-in">Sign In</Nav.Link>}
            {authed() && (
              <Nav.Link
                style={{ height: "8%", marginTop: "1.5%", color: "white" }}
                className="btn btn-primary fs-6"
                variant="primary"
                size="lg"
                onClick={logoutUser}
              >
                Logout: {username}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
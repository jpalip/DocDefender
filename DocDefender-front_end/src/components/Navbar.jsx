import { useState, useEffect } from "react";
import useAuth from "../hooks/hooks";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./icon.png";

/*  Navbar function renamed to Taskbar in order to resolve naming
    conflict with Navbar class in Bootstrap */
export default function Taskbar() {
  const { getUsername, authed, logoutUser, isAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!authed()) {
      return;
    }
    (async () => {
      setUsername(await getUsername());
      setAdmin(await isAdmin());
    })();
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
          <Nav className="ms-auto fs-4">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/user">Files</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/terms">Terms</Nav.Link>
            {admin || <></>}
            {admin && (
              <Nav.Link
                className="btn btn-danger fs-6"
                style={{
                  height: "8%",
                  marginTop: "1.5%",
                  color: "white",
                  fontSize: "large",
                }}
                variant="danger"
                href="/admin"
              >
                <b>Admin</b>
              </Nav.Link>
            )}
            <div className="spacer"></div>
            {authed() || <Nav.Link href="/sign-in">Sign In</Nav.Link>}
            {authed() && (
              <Nav.Link
                style={{ height: "8%", marginTop: "1.5%", color: "white" }}
                className="btn btn-primary fs-6"
                variant="primary"
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

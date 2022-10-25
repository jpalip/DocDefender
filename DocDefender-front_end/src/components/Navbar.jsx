import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import useAuth from "../hooks/hooks";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./icon.png";

/*  Navbar function renamed to Taskbar in order to resolve naming
    conflict with Navbar class in Bootstrap */
export default function Taskbar() {
  const { getUsername, authed, logoutUser } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!authed()) {
      return;
    }
    getUsername().then((r) => {
      if (r.data) {
        setUsername(r.data.username);
      }
    });
  }, [getUsername, authed]);

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
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/user">My Files</Nav.Link>
            {authed() || <Nav.Link href="/sign-in">Sign In</Nav.Link>}
            {authed() && (
              <Button
                style={{ height: "8%", marginTop: "2.5%" }}
                variant="primary"
                size="sm"
                onClick={logoutUser}
                className="fs-6"
              >
                Logout: {username}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

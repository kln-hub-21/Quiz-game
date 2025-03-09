import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img src="/logo.png" width={45} alt="Logo" className="me-2" />
          <span className="brand-text">QUIZ-GAME</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="nav-item">
              MCQ Quiz
            </Nav.Link>
            <Nav.Link as={NavLink} to="/chat-quiz" className="nav-item">
              Chat Quiz
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;

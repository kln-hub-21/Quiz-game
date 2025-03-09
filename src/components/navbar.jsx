// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';


// function TopNavbar() {

//     return (<>
//         <Navbar expand="xl" className="bg-success">
//             <Container>
//                 <Navbar.Brand href="#home">
//                     <img src="/logo.png" width={45} alt="" className=' mr-2' /> <span className='mt-2 top-5 text-white'>QUIZ-GAME</span></Navbar.Brand>
//                 <Navbar.Toggle />
//                 <Navbar.Collapse >
//                     <Nav className="me-auto text-white">
//                         <Nav.Link href="/" className='text-white'>MCQ Quiz</Nav.Link>
//                         <Nav.Link href="/chat-quiz" className='text-white'>Chat Quiz</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar></>)

// }

// export default TopNavbar



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

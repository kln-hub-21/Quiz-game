import React from "react";
import Chat from "./components/mcqQuiz";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import McqQuiz from "./pages/mcqQuiz";
import ChatQuiz from "./pages/chatQuiz";

function App() {
  return (
    <Router>
      <TopNavbar /> {/* Navbar should be outside Routes */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<McqQuiz />} />
          <Route path="/chat-quiz" element={<ChatQuiz />} />
        </Routes>

        {/* If Chat is needed only on certain pages, conditionally render it */}
        {/* <Chat /> */}
      </Container>
    </Router>
  );
}

export default App;

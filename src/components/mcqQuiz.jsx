import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import useQuizStore from "../store/quizStore";
import ChartResults from "./chartResults";

const McqQuizComponent = () => {
    const { questions, userAnswers, currentQuestionIndex, setAnswer, quizCompleted, quizSubmitted, submitQuiz, resetQuiz } =
        useQuizStore();
    const [textInput, setTextInput] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        console.log(userAnswers, questions, 'userAnswers,questions')
        console.log(quizCompleted,'quizCompleted')

    }, [userAnswers, questions,quizCompleted])

    if (quizCompleted && quizSubmitted) {
        return (
            <Container className="mt-4 text-center">
                <h4><img src="/celebration.png" alt="" width={25} /> Quiz Completed! Here are your results:</h4>
                <ChartResults {...{questions, userAnswers}} />
                <Button variant="secondary" className="mt-3" onClick={resetQuiz}>
                    Restart Quiz
                </Button>
            </Container>
        );
    }

    if (!quizStarted) {
        return (
            <Container className="mt-4 text-center vh-85 w-75 p-3">
                <Card className="shadow-lg p-3 h-100 d-flex flex-column align-items-center justify-content-center"
                //  style={{ minWidth: "600px" }}
                 >
                    <h3>Welcome to the Quiz Game!</h3>
                    <div className="w-100 d-flex justify-content-center w-100 h-75 p-4">
                        <img
                            src="/quiz.jpg"
                            className="rounded w-100 h-100"
                            alt="Quiz"
                        />
                    </div>
                    <Button variant="primary" className="px-5" onClick={() => setQuizStarted(true)}>
                        Let's Start Quiz
                    </Button>
                </Card>
            </Container>

        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (option) => setAnswer(currentQuestion.id, option);
    const handleTextSubmit = () => {
        if (textInput.trim() !== "") {
            setAnswer(currentQuestion.id, textInput);
            setTextInput("");
        }
    };

    return (
        <Container className="mt-4 d-flex justify-content-center vh-85 p-3">
            <Card className="shadow-lg p-3 h-100" style={{ width: "600px" }}>
                {/* Question Section */}
                <Card.Header className="bg-primary text-white text-center">
                    <h5>Question {currentQuestionIndex + 1}/{questions.length}</h5>
                </Card.Header>
                <Card.Body className="py-5">
                    {!quizCompleted && !quizSubmitted ? (<>
                        <Card.Title className="text-center mb-3">
                            {currentQuestion.text}
                        </Card.Title>

                        <div className="d-flex flex-column align-items-center">
                            {currentQuestion.type === "mcq" ? (
                                currentQuestion.options.map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline-primary"
                                        className="w-100 mb-2"
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option}
                                    </Button>
                                ))
                            ) : (
                                <Form.Group className="w-100">
                                    <Form.Control
                                        type="text"
                                        placeholder="Type your answer..."
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                    />
                                    <Button variant="primary" className="w-100 mt-2" onClick={handleTextSubmit}>
                                        Submit Answer
                                    </Button>
                                </Form.Group>
                            )}
                        </div>
                    </>) : (<>
                        <Card.Title className="text-center mb-3">
                            You answered all Questions
                        </Card.Title>
                        {/* Submit Button after all questions */}
                        {questions.length === Object.keys(userAnswers).length && (
                            <Button variant="success" className="w-100 mt-3" onClick={submitQuiz}>
                              Submit & view Results
                            </Button>
                        )}
                    </>)}

                </Card.Body>
            </Card>
        </Container>
    );
};

export default McqQuizComponent;


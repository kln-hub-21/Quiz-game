import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import useQuizStore from "../store/quizStore";
import ChartResults from "./chartResults";



const ChatQuizComponent = () => {
    const { chatQuestions, chatUserAnswers, chatCurrentQuestionIndex, setChatAnswer, chatQuizCompleted, chatQuizSubmitted, submitChatQuiz, resetChatQuiz } =
        useQuizStore();
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [lifeLine, setLifeLine] = useState(3)

    const currentQuestion = chatQuestions[chatCurrentQuestionIndex];

    const submitAnswer = () => {
        if (currentAnswer.trim() !== "") {
            const feedback = chatQuestions[chatCurrentQuestionIndex].correct.toLowerCase() === currentAnswer.toLowerCase() ? "Correct" : "Incorrect"
            const newAnswer = { answer: currentAnswer, feedback: feedback }
            if (answers[chatCurrentQuestionIndex]) {
                setAnswers(prev =>
                    prev.map(ans =>
                        ans.id === chatCurrentQuestionIndex
                            ? { ...ans, answers: [...ans.answers, newAnswer] }
                            : ans
                    ))

            } else {
                setAnswers(prev => ([...prev, { id: chatCurrentQuestionIndex, answers: [newAnswer] }]))
            }
            if (feedback === "Correct" || lifeLine <= 1) {
                console.log("here")
                setCurrentAnswer("")
                setTimeout(() => {
                    setChatAnswer(currentQuestion.id, currentAnswer)
                    setLifeLine(3);
                }, 2000)
                return
            }
            setCurrentAnswer("")
            setLifeLine(prev => prev - 1)


        }
    }

    const resetQuiz = () => {
        resetChatQuiz()
        setAnswers([])
    }


    if (chatQuizCompleted && chatQuizSubmitted) {
        return (
            <Container className="mt-4 text-center">
                <h4><img src="/celebration.png" alt="" width={25} /> Quiz Completed! Here are your results:</h4>
                <ChartResults questions={chatQuestions} userAnswers={chatUserAnswers} />
                <Button variant="secondary" className="mt-3" onClick={resetQuiz}>
                    Restart Quiz
                </Button>
            </Container>
        );
    }

    return (<>
        <Container className="mt-4 d-flex justify-content-center vh-85 p-3">
            <Card className="shadow-lg p-3 h-100" style={{ width: "600px" }}>
                {/* Question Section */}
                <Card.Header className="bg-primary text-white text-center">
                    <h5>Question {chatCurrentQuestionIndex + 1}/{chatQuestions.length}</h5>
                </Card.Header>
                <Card.Body className="py-4">
                    {chatQuizCompleted ? (<><Card.Title className="text-center mt-5">
                        You answered all Questions!
                    </Card.Title></>) : (<>
                        <Card.Title className="text-start mb-3 ">
                            {currentQuestion.text}
                        </Card.Title>
                        <div>
                            {answers.filter((ele) => ele.id === chatCurrentQuestionIndex)?.[0]?.answers.map((ans, index) => (<>
                                <div className="mb-3 w-75 float-right ms-auto">
                                    <Card className={`${ans.feedback === "Correct" ? "border-success" : "border-danger"}`}>
                                        <Card.Body className="px-3 py-2">{ans.answer}
                                        </Card.Body>
                                    </Card>
                                    <span className={`${ans.feedback === "Correct" ? "text-success" : "text-danger"}`}>
                                        <small>{ans.feedback}! {ans.feedback === "Incorrect" && index < 2 && "give it another try"}</small>

                                    </span>
                                </div>
                            </>))}
                        </div></>)}


                </Card.Body>
                <Card.Footer className="text-muted">
                    {chatQuizCompleted ? (<>
                        <Button variant="success" className="w-100 mt-3" onClick={submitChatQuiz}>
                            Submit & view Results
                        </Button>
                    </>) : (<>
                        <InputGroup >
                            <Form.Control
                                placeholder="Write your answer here...."
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                value={currentAnswer}
                                variant="outline-primary"
                                className="border-primary"
                            />
                            <Button variant="outline-primary" id="button-addon2"
                                onClick={submitAnswer}>
                                Send
                            </Button>
                        </InputGroup>
                    </>)}
                </Card.Footer>
            </Card>
        </Container>
    </>)

}

export default ChatQuizComponent
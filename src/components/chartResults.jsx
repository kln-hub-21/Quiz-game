import React from "react";
import { Container, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; // Green for correct, Red for incorrect

const ChartResults = ({questions, userAnswers }) => {

  // Calculate correct and incorrect answers
  let correctCount = 0;
  let incorrectCount = 0;
  console.log(questions, userAnswers,'questions, userAnswers')
  questions.forEach((q) => {
      if (userAnswers[q.id].toLowerCase() === q.correct.toLowerCase()) {
          correctCount++;
        } else {
            incorrectCount++;
        }
    });

    const correctPercen = (correctCount/questions.length)*100

  // Data for Bar Chart
  const barData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
  ];

  // Data for Pie Chart
  const pieData = [
    { name: "Correct", value: correctPercen },
    { name: "Incorrect", value: 100-correctPercen },
  ];

  return (
    <Container className="text-center mt-4">
      <Card className="p-3 shadow-lg">
        <h6 className="mb-3">Quiz Results</h6>

        {/* Bar Chart */}
        <div className="d-flex justify-content-between">
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>

          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Pie Chart */}
        <div className="d-flex justify-content-center">
            <h5> {`You scored ${correctCount}/${questions.length} (${correctPercen}%)`}</h5>  
        </div>
      </Card>
    </Container>
  );
};

export default ChartResults;

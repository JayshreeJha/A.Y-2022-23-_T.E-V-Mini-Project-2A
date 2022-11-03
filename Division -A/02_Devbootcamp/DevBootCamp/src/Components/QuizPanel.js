import React, { useState, useEffect } from "react";
import questionDefault from "../Content/quiz.json";

export const QuizPanel = (props) => {
  const [questions, setQusetions] = useState(questionDefault);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (props.data[0].question) setQusetions(props.data);
  }, [props.data]);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  async function checkAccessToFinalQuiz(percentage, pathName) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}course/check${pathName}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-access-tokens": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marks: percentage,
        }),
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  }

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
    let percentage = (newScore / questions.length) * 100;
    if (percentage > 50) {
      if (props.path) {
        checkAccessToFinalQuiz(percentage, props.path);
        props.result();
      }
    }
  };

  return (
    <>
      {questions ? (
        <div className="flex flex-col h-full bg-[#1A1A1A] justify-center items-center">
          {showScore ? (
            <h1 className="text-3xl font-semibold text-center text-white">
              You scored {score} out of {questions.length}
            </h1>
          ) : (
            <>
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-white/60">
                  {" "}
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="mt-4 text-2xl text-white">
                  {questions[currentQuestion].question}
                </div>
                {questions[currentQuestion].answerOptions.map(
                  (answer, index) => (
                    <div
                      key={index}
                      className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                      onClick={() => handleAnswerOption(answer.answer)}
                    >
                      <input
                        type="radio"
                        name={answer.answer}
                        value={answer.answer}
                        onChange={() => handleAnswerOption(answer.answer)}
                        checked={
                          answer.answer ===
                          selectedOptions[currentQuestion]?.answerByUser
                        }
                        className="w-6 h-6 bg-black"
                      />
                      <p className="ml-6 text-white">{answer.answer}</p>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between w-full mt-4 text-white">
                <button
                  onClick={handlePrevious}
                  className="w-[49%] py-3 bg-indigo-600 rounded-lg"
                >
                  Previous
                </button>
                <button
                  onClick={
                    currentQuestion + 1 === questions.length
                      ? handleSubmitButton
                      : handleNext
                  }
                  className="w-[49%] py-3 bg-indigo-600 rounded-lg"
                >
                  {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

import React, { useState } from 'react';
import './App.scss';
import { Question } from './components/Question/Question';
import { Result } from './components/Result/Result';
import questionIcon from './img/undraw_adventure.svg';
import questions from './questions.json';

function App() {
  const [score, setScore] = useState(0);
  const [isQuestion, setIsQuestion] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleScoreSet = () => {
    setScore(score + 1);
  };

  const handleQuestionNumberSet = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    } else {
      setIsQuestion(false);
    }
  };

  const handleFinish = () => {
    setScore(0);
    setIsQuestion(true);
    setQuestionNumber(0);
  };

  return (
    <div className="App">
      <div className='App__container'>
        {isQuestion && (
          <img className='App__icon' src={questionIcon} alt="Image of a man and a globe" />
        )}
        <h1 className='App__title'>Country quiz</h1>
        {isQuestion 
          ? (<Question 
              question={questions[questionNumber]}
              setScore={handleScoreSet}
              setQuestionNumber={handleQuestionNumberSet}
            />)
          : (<Result score={score} setFinish={handleFinish} />)
        }
      </div>
    </div>
  );
}

export default App;

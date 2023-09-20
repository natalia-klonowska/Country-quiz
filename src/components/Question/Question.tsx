import React, { useEffect, useState } from 'react';
import './Question.scss';
import { QuestionType } from '../../types/Question'
import { AnswersType } from '../../types/Answers';
import { CapitalDataType } from '../../types/CapitalData';
import { getCapitalData } from '../../api/capitalData';

interface QuestionProps {
  question: QuestionType,
  setScore: () => void,
  setQuestionNumber: () => void,
};

export const Question: React.FC<QuestionProps> = ({question, setScore, setQuestionNumber}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);

  const capital = question.question;
  const isSelectedClass = isSelected ? 'selected' : '';

  useEffect(() => {
    loadCapitalData();
  }, [capital]);

  const loadCapitalData = async () => {
    const data: CapitalDataType[] = await getCapitalData(capital);
    setCorrectAnswer(data[0].name.common);
  };

  const handleSelect = (answerId: string, answer: string) => {
    setSelectedId(answerId);
    setIsSelected(true);
    setDisabled(true);
    
    if (answer === correctAnswer) {
      setScore();
    }
  }

  const handleReset = () => {
    setIsSelected(false);
    setSelectedId('');
    setCorrectAnswer('');
    setDisabled(false);
  }

  const handleNext = () => {
    handleReset();
    setQuestionNumber();
  }
  
  return (
    <div className={`Question ${isSelectedClass}`}>
      <h2 className='Question__title'>{`${capital} is the capital of`}</h2>

      <div className={`Question__answers ${isSelectedClass}`}>
        {Object.keys(question.answers).map((answerId, i) => {
          const answer = question.answers[answerId as keyof AnswersType];
          const isCorrectClass = answer === correctAnswer && isSelected ? 'correct' : '';
          const isWrongClass = selectedId === answerId && answer !== correctAnswer ? 'wrong' : '';

          return (
          <button className={`Answer ${isSelectedClass} ${isCorrectClass} ${isWrongClass}`} disabled={disabled} onClick={() => handleSelect(answerId, answer)} key={answerId}>
            <div className='Answer__number'>{answerId}</div>
            <div className='Answer__text'>{answer}</div>
          </button>
          )
        })}
      </div>

      <button className={`Question__button ${isSelectedClass}`} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

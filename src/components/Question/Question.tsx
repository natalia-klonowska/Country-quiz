import React, { useEffect, useState } from 'react';
import './Question.scss';
import { QuestionType } from '../../types/Question'
import { AnswersType } from '../../types/Answers';
import { CountryDataType } from '../../types/CountryData';
import { getCapitalData, getCountryData } from '../../api/questionData';
import correctIcon from '../../icons/correct.svg';
import wrongIcon from '../../icons/wrong.svg';

interface QuestionProps {
  question: QuestionType,
  setScore: () => void,
  setQuestionNumber: () => void,
};

export const Question: React.FC<QuestionProps> = ({question, setScore, setQuestionNumber}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [flag, setFlag] = useState('');
  const [flagAlt, setFlagAlt] = useState('');
  const [disabled, setDisabled] = useState(false);

  const capital = question.capital;
  const country = question.country;
  const isSelectedClass = isSelected ? 'selected' : '';

  useEffect(() => {
    loadQuestionData();
  }, [question]);

  const loadQuestionData = async () => {
    if (capital) {
      const data: CountryDataType[] = await getCapitalData(capital);
      setCorrectAnswer(data[0].name.common);
    } else if (country) {
      const data: CountryDataType[] = await getCountryData(country);
      setCorrectAnswer(data[0].name.common);
      setFlag(data[0].flags.png);
      setFlagAlt(data[0].flags.alt);
    }
    
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
    setFlag('');
    setFlagAlt('');
    setDisabled(false);
  }

  const handleNext = () => {
    handleReset();
    setQuestionNumber();
  }
  
  return (
    <div className={`Question ${isSelectedClass}`}>
      {capital 
        ? (
          <h2 className='Question__title'>{`${capital} is the capital of`}</h2>
        )
        : (
          <>
            <img className='Question__flag' src={flag} alt={flagAlt} />
            <h2 className='Question__title'>Which country does this flag belong to?</h2>
          </>
        )
      }

      <div className={`Question__answers ${isSelectedClass}`}>
        {Object.keys(question.answers).map((answerId, i) => {
          const answer = question.answers[answerId as keyof AnswersType];
          const isCorrectClass = answer === correctAnswer && isSelected ? 'correct' : '';
          const isWrongClass = selectedId === answerId && answer !== correctAnswer ? 'wrong' : '';

          return (
          <button className={`Answer ${isSelectedClass} ${isCorrectClass} ${isWrongClass}`} disabled={disabled} onClick={() => handleSelect(answerId, answer)} key={answerId}>
            <div className='Answer__number'>{answerId}</div>
            <div className='Answer__text'>{answer}</div>
            <img className={`Answer__icon ${isCorrectClass}`} src={correctIcon} alt="icon for correct answer" />
            <img className={`Answer__icon ${isWrongClass}`} src={wrongIcon} alt="icon for wrong answer" />
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

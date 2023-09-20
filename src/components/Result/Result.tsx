import React from 'react';
import './Result.scss';
import resultIcon from '../../img/undraw_winners_ao2o 2.svg';

interface ResultProps {
  score: number,
  setFinish: () => void,
}

export const Result: React.FC<ResultProps> = ({score, setFinish}) => {
  
  
  return (
    <div className='Result'>
      <img className='Result__icon' src={resultIcon} alt="Image of a golden trophy and two people cheering" />
      <h2 className='Result__title'>Results</h2>
      <span className='Result__text'>You got <span className='Result__score'>{score}</span> correct answers</span>

      <button className='Result__button' onClick={setFinish}>
        Try again
      </button>
    </div>
  );
}
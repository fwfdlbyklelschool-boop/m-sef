
import React from 'react';
import { Question } from '../types';
import Button from './common/Button';

interface QuestionnaireProps {
  question: Question;
  onAnswer: (answer: string) => void;
  progress: number;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ question, onAnswer, progress }) => {
  return (
    <div className="w-full max-w-xl p-8 bg-cyan-500/50 backdrop-blur-sm rounded-2xl shadow-2xl text-center text-white">
      <div className="w-full bg-white/30 rounded-full h-2.5 mb-6">
        <div className="bg-white h-2.5 rounded-full" style={{ width: `${progress * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
      </div>

      <h2 className="text-3xl font-bold mb-8">{question.text}</h2>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <Button key={option} onClick={() => onAnswer(option)}>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;

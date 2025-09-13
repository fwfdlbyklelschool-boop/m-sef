
import React, { useState } from 'react';
import Button from './common/Button';

interface InterestsSelectorProps {
  interests: string[];
  onSubmit: (selectedInterests: string[]) => void;
  error: string | null;
}

const InterestTag: React.FC<{ interest: string; isSelected: boolean; onToggle: () => void }> = ({ interest, isSelected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full border-2 transition-colors duration-200 ${
        isSelected
          ? 'bg-white text-cyan-500 border-white'
          : 'bg-transparent text-white border-white/50 hover:bg-white/20'
      }`}
    >
      {interest}
    </button>
  );
};


const InterestsSelector: React.FC<InterestsSelectorProps> = ({ interests, onSubmit, error }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if(selectedInterests.length < 3){
        alert("Please select at least 3 interests.");
        return;
    }
    onSubmit(selectedInterests);
  };

  return (
    <div className="w-full max-w-3xl p-8 bg-cyan-500/50 backdrop-blur-sm rounded-2xl shadow-2xl text-center text-white">
      <h2 className="text-3xl font-bold mb-2">What are you into?</h2>
      <p className="text-white/80 mb-8">Select at least 3 interests.</p>
      
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-h-80 overflow-y-auto p-2">
        {interests.map((interest) => (
          <InterestTag 
            key={interest} 
            interest={interest} 
            isSelected={selectedInterests.includes(interest)}
            onToggle={() => toggleInterest(interest)} 
          />
        ))}
      </div>
      
      {error && <p className="text-red-200 bg-red-800/50 p-3 rounded-lg mb-4">{error}</p>}

      <div className="max-w-xs mx-auto">
        <Button onClick={handleSubmit}>
          Find My Vibe
        </Button>
      </div>
    </div>
  );
};

export default InterestsSelector;

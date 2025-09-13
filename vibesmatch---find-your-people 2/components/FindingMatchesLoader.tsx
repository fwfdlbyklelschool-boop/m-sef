
import React from 'react';

const FindingMatchesLoader: React.FC = () => {
  return (
    <div className="text-center text-white flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-4xl font-bold mb-2">Finding your vibe...</h2>
      <p className="text-xl opacity-80">Our AI is curating the perfect matches for you.</p>
    </div>
  );
};

export default FindingMatchesLoader;

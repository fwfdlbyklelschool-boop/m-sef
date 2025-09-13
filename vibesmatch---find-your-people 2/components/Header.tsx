
import React from 'react';

const VibesMatchLogo: React.FC = () => (
  <h1 className="text-4xl font-bold text-white">
    Vibes<span className="text-gray-800">Match</span>
  </h1>
);


const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl py-4 mb-8">
      <div className="flex justify-center items-center">
        <VibesMatchLogo />
      </div>
    </header>
  );
};

export default Header;

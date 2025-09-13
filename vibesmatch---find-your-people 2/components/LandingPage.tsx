
import React from 'react';
import Button from './common/Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="text-center text-white p-4 flex flex-col items-center justify-center h-full">
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
         <h1 className="text-2xl font-bold text-white">Vibes<span className="text-gray-800">Match</span></h1>
         <nav className="hidden md:flex items-center space-x-8 text-lg">
           <a href="#" className="hover:text-gray-200">Home</a>
           <a href="#" className="hover:text-gray-200">About</a>
           <a href="#" className="hover:text-gray-200">Join us</a>
           <a href="#" className="hover:text-gray-200">Blog</a>
         </nav>
         <button onClick={onStart} className="hidden md:block bg-white text-cyan-500 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">Sign Up</button>
      </header>
      
      <div className="max-w-xl mx-auto mt-20 md:mt-0">
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 shadow-text">
          Experience life together with your people
        </h2>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Find friends who share your vibe.
        </p>
        <div className="max-w-xs mx-auto">
            <Button onClick={onStart}>
                Start Matching
            </Button>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-0 -right-20 w-1/2 max-w-lg">
        <img src="https://i.imgur.com/uR1hB6p.png" alt="App Preview" className="w-full" />
      </div>
    </div>
  );
};

export default LandingPage;

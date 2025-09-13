
import React, { useState, useCallback } from 'react';
import { AppState, UserProfile, Match, QuestionAnswer } from './types';
import { QUESTIONS, INTERESTS } from './constants';
import { generateMatches } from './services/geminiService';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import Questionnaire from './components/Questionnaire';
import InterestsSelector from './components/InterestsSelector';
import FindingMatchesLoader from './components/FindingMatchesLoader';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState(AppState.SIGNUP);
  };

  const handleSignUpSubmit = (data: Omit<UserProfile, 'interests' | 'answers'>) => {
    setUserProfile(data);
    setAppState(AppState.QUESTIONNAIRE);
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => [...prev, { question: QUESTIONS[questionIndex].text, answer }]);
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setAppState(AppState.INTERESTS);
    }
  };

  const handleInterestsSubmit = useCallback(async (selectedInterests: string[]) => {
    const finalProfile: UserProfile = {
        ...userProfile,
        interests: selectedInterests,
        answers: answers
    } as UserProfile;
    
    setUserProfile(finalProfile);
    setAppState(AppState.FINDING_MATCHES);
    setError(null);

    try {
        const generatedMatches = await generateMatches(finalProfile);
        setMatches(generatedMatches);
        setAppState(AppState.DASHBOARD);
    } catch (e) {
        console.error(e);
        setError("Sorry, we couldn't find your vibe. Please try again later.");
        setAppState(AppState.INTERESTS); // Go back to the previous step on error
    }
  }, [userProfile, answers]);


  const renderContent = () => {
    switch (appState) {
      case AppState.LANDING:
        return <LandingPage onStart={handleStart} />;
      case AppState.SIGNUP:
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      case AppState.QUESTIONNAIRE:
        return (
          <Questionnaire
            question={QUESTIONS[questionIndex]}
            onAnswer={handleAnswerSelect}
            progress={(questionIndex + 1) / QUESTIONS.length}
          />
        );
      case AppState.INTERESTS:
        return <InterestsSelector interests={INTERESTS} onSubmit={handleInterestsSubmit} error={error}/>;
      case AppState.FINDING_MATCHES:
        return <FindingMatchesLoader />;
      case AppState.DASHBOARD:
        return <Dashboard matches={matches} userProfile={userProfile as UserProfile} />;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  const showHeader = appState !== AppState.LANDING;

  return (
    <div className="min-h-screen bg-cyan-400 font-sans text-gray-800 flex flex-col items-center p-4 sm:p-6">
      {showHeader && <Header />}
      <main className="w-full max-w-4xl flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

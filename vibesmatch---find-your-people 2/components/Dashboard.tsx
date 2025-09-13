
import React from 'react';
import { Match, UserProfile } from '../types';

interface ProfileCardProps {
  match: Match;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ match }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:space-x-6 p-4">
      <img 
        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md border-4 border-white" 
        src={`${match.avatarUrl}?random=${match.id}`} 
        alt={`Profile of ${match.name}`} 
      />
      <div className="text-center md:text-left mt-4 md:mt-0 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800">{match.name}, {match.age}</h3>
        <p className="text-cyan-600 font-medium mt-1">{match.shortBio}</p>
      </div>
      <div className="mt-4 md:mt-0 flex-shrink-0">
        <button className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-cyan-600 transition-all transform hover:scale-105">
          View Profile
        </button>
      </div>
    </div>
  );
};


interface DashboardProps {
  matches: Match[];
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ matches, userProfile }) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="text-center text-white mb-8">
        <h2 className="text-4xl font-bold">Hey {userProfile.name}, we found your vibe!</h2>
        <p className="text-xl opacity-90">Here are some people you might get along with.</p>
      </div>
      <div className="space-y-6">
        {matches.length > 0 ? (
          matches.map((match) => <ProfileCard key={match.id} match={match} />)
        ) : (
          <div className="bg-white/80 p-8 rounded-xl shadow-lg text-center text-gray-700">
            <h3 className="text-2xl font-bold">No matches found</h3>
            <p>We couldn't find anyone with your vibe right now. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

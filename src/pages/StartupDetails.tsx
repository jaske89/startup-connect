import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ContributionForm } from '../components/ContributionForm';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';

export function StartupDetails() {
  const { id } = useParams();
  const startup = useStore((state) => state.startups.find(s => s.id === id));
  const contributions = useStore((state) => 
    state.contributions.filter(c => c.startupId === id)
  );

  if (!startup) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Startup not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          {startup.logo ? (
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-indigo-600">{startup.name[0]}</span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
            <p className="text-gray-500">Founded by {startup.founderName}</p>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-2">About the Service</h2>
          <p className="text-gray-600">{startup.service}</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Who We're Looking For</h2>
          <div className="flex flex-wrap gap-2">
            {startup.idealUsers.map((user, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
              >
                {user}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Contributions</h2>
        <div className="space-y-4 mb-8">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {contribution.type === 'comment' ? (
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                  ) : (
                    <ThumbsUp className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm font-medium capitalize">
                    {contribution.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(contribution.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{contribution.content}</p>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    contribution.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : contribution.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {contribution.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <ContributionForm startupId={id} userId="temp-user-id" />
      </div>
    </div>
  );
}
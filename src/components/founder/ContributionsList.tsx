import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MessageSquare, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import type { Startup, Contribution } from '../../types';

interface ContributionsListProps {
  startups: Startup[];
}

export function ContributionsList({ startups }: ContributionsListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const contributions = useStore((state) => 
    state.contributions.filter(c => 
      startups.some(s => s.id === c.startupId)
    )
  );
  const updateContributionStatus = useStore((state) => state.updateContributionStatus);

  const filteredContributions = contributions.filter(c => 
    filter === 'all' ? true : c.status === filter
  );

  const handleStatusUpdate = (contributionId: string, status: 'accepted' | 'rejected') => {
    updateContributionStatus(contributionId, status);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Contributions</h2>
        <div className="flex space-x-2">
          {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === status
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredContributions.map((contribution) => (
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
            
            {contribution.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusUpdate(contribution.id, 'accepted')}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate(contribution.id, 'rejected')}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Reject
                </button>
              </div>
            )}
            
            {contribution.status !== 'pending' && (
              <span
                className={`inline-block text-sm px-2 py-1 rounded ${
                  contribution.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
              </span>
            )}
          </div>
        ))}

        {filteredContributions.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No contributions found.
          </p>
        )}
      </div>
    </div>
  );
}
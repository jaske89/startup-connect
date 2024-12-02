import React from 'react';
import { useStore } from '../store/useStore';
import { Coins, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

export function UserDashboard() {
  // For demo purposes, using a temporary user ID
  const tempUserId = 'temp-user-id';
  const contributions = useStore((state) =>
    state.contributions.filter((c) => c.userId === tempUserId)
  );
  const users = useStore((state) => state.users);
  const currentUser = users.find((u) => u.id === tempUserId);

  const tokens = currentUser?.tokens || 0;
  const acceptedContributions = contributions.filter(
    (c) => c.status === 'accepted'
  ).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <Coins className="w-5 h-5" />
              <h2 className="font-semibold">Available Tokens</h2>
            </div>
            <p className="text-2xl font-bold text-indigo-700">{tokens}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <CheckCircle className="w-5 h-5" />
              <h2 className="font-semibold">Accepted Contributions</h2>
            </div>
            <p className="text-2xl font-bold text-green-700">{acceptedContributions}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <MessageSquare className="w-5 h-5" />
              <h2 className="font-semibold">Total Contributions</h2>
            </div>
            <p className="text-2xl font-bold text-blue-700">{contributions.length}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Contributions</h2>
        <div className="space-y-4">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="capitalize font-medium">{contribution.type}</span>
                <div className="flex items-center space-x-2">
                  {contribution.status === 'pending' && (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  )}
                  {contribution.status === 'accepted' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {contribution.status === 'rejected' && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm ${
                      contribution.status === 'pending'
                        ? 'text-yellow-600'
                        : contribution.status === 'accepted'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {contribution.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{contribution.content}</p>
              <div className="text-sm text-gray-500">
                {new Date(contribution.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}

          {contributions.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              You haven't made any contributions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
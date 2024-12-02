import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Eye } from 'lucide-react';
import type { Startup } from '../../types';

interface StartupsListProps {
  startups: Startup[];
}

export function StartupsList({ startups }: StartupsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Startups</h2>
      <div className="space-y-4">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {startup.logo ? (
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xl text-indigo-600">
                      {startup.name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {startup.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {startup.description.slice(0, 100)}...
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{startup.visits || 0}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{startup.activeUsers || 0}</span>
                </div>
                <Link
                  to={`/startup/${startup.id}`}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {startups.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            You haven't created any startups yet.
          </p>
        )}
      </div>
    </div>
  );
}
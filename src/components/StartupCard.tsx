import React from 'react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Startup } from '../types';
import { cn } from '../lib/utils';

interface StartupCardProps {
  startup: Startup;
  className?: string;
}

export function StartupCard({ startup, className }: StartupCardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-md overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {startup.logo ? (
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <Sparkles className="w-12 h-12 text-indigo-600" />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{startup.name}</h3>
              <p className="text-sm text-gray-500">by {startup.founderName}</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{startup.description}</p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Users className="w-4 h-4" />
          <span>Looking for:</span>
          <div className="flex flex-wrap gap-2">
            {startup.idealUsers.map((user, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs"
              >
                {user}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/startup/${startup.id}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          Learn more
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
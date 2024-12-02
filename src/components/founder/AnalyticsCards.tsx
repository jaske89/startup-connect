import React from 'react';
import { useStore } from '../../store/useStore';
import { Users, MessageSquare, TrendingUp, ThumbsUp } from 'lucide-react';
import type { Startup } from '../../types';

interface AnalyticsCardsProps {
  startups: Startup[];
}

export function AnalyticsCards({ startups }: AnalyticsCardsProps) {
  const contributions = useStore((state) => 
    state.contributions.filter(c => 
      startups.some(s => s.id === c.startupId)
    )
  );

  const totalVisits = startups.reduce((acc, startup) => acc + (startup.visits || 0), 0);
  const pendingContributions = contributions.filter(c => c.status === 'pending').length;
  const acceptedContributions = contributions.filter(c => c.status === 'accepted').length;
  const totalUsers = startups.reduce((acc, startup) => acc + (startup.activeUsers || 0), 0);

  const cards = [
    {
      title: 'Total Visits',
      value: totalVisits,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Reviews',
      value: pendingContributions,
      icon: MessageSquare,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Accepted Contributions',
      value: acceptedContributions,
      icon: ThumbsUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Users',
      value: totalUsers,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bgColor} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
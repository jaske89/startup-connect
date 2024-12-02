import React from 'react';
import { useStore } from '../store/useStore';
import { AnalyticsCards } from '../components/founder/AnalyticsCards';
import { ContributionsList } from '../components/founder/ContributionsList';
import { StartupsList } from '../components/founder/StartupsList';

export function FounderDashboard() {
  // For demo purposes, using a temporary founder ID
  const tempFounderId = 'temp-founder-id';
  const startups = useStore((state) => 
    state.startups.filter(s => s.founderName === tempFounderId)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Founder Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <StartupsList startups={startups} />
        <AnalyticsCards startups={startups} />
        <ContributionsList startups={startups} />
      </div>
    </div>
  );
}
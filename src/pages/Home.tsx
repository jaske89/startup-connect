import React from 'react';
import { useStore } from '../store/useStore';
import { StartupCard } from '../components/StartupCard';
import { Search } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { Benefits } from '../components/home/Benefits';
import { About } from '../components/home/About';

export function Home() {
  const startups = useStore((state) => state.startups);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStartups = startups.filter((startup) =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16">
      <Hero />
      <Benefits />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Startups</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover innovative startups and help shape their future
            </p>
          </div>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No startups found. Be the first to add one!</p>
            </div>
          )}
        </div>
      </section>

      <About />
    </div>
  );
}
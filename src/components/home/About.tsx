import React from 'react';
import { Heart } from 'lucide-react';

export function About() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h2>
          <div className="mt-6 text-lg leading-8 text-gray-300">
            <p className="mb-4">
              We're a small team of startup enthusiasts who've been through the ups and downs of building products. 
              We know firsthand the importance of validation and user feedback in the early stages.
            </p>
            <div className="flex items-center gap-2 text-indigo-400">
              <Heart className="h-5 w-5" />
              <p className="font-semibold">From founders, to founders</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {[
            'Built with love by entrepreneurs who understand your journey',
            'Committed to helping startups succeed through early validation',
            'Creating a community of supportive early adopters',
          ].map((value) => (
            <div key={value} className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
              <div className="text-base leading-7 text-gray-300">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
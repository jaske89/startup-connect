import React from 'react';
import { Target, Users, Lightbulb, TrendingUp } from 'lucide-react';

const benefits = [
  {
    name: 'Early Validation',
    description: 'Test your ideas with real users before investing significant resources. Get valuable feedback early in the development process.',
    icon: Target,
  },
  {
    name: 'Community Feedback',
    description: 'Connect with potential users who are genuinely interested in your solution and eager to provide constructive feedback.',
    icon: Users,
  },
  {
    name: 'Iterative Improvement',
    description: 'Use community insights to refine your product. Make data-driven decisions based on real user feedback.',
    icon: Lightbulb,
  },
  {
    name: 'Market Fit',
    description: 'Achieve product-market fit faster by understanding your users needs and pain points directly from the source.',
    icon: TrendingUp,
  },
];

export function Benefits() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Validate Your MVP</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Build with confidence
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Validation is crucial for startup success. Get real feedback from real users and build something people actually want.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <benefit.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
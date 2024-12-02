import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ContributionFormProps {
  startupId: string;
  userId: string;
}

export function ContributionForm({ startupId, userId }: ContributionFormProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'comment' | 'suggestion'>('comment');
  const addContribution = useStore((state) => state.addContribution);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addContribution({
      id: crypto.randomUUID(),
      startupId,
      userId,
      content,
      type,
      status: 'pending',
      createdAt: new Date(),
    });

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type of Contribution
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'comment' | 'suggestion')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="comment">Comment</option>
          <option value="suggestion">Suggestion</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Contribution
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Share your thoughts or suggestions..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Contribution
      </button>
    </form>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Plus, X } from 'lucide-react';

export function CreateStartup() {
  const navigate = useNavigate();
  const addStartup = useStore((state) => state.addStartup);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [founderName, setFounderName] = useState('');
  const [logo, setLogo] = useState('');
  const [idealUser, setIdealUser] = useState('');
  const [idealUsers, setIdealUsers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startup = {
      id: crypto.randomUUID(),
      name,
      description,
      service,
      founderName,
      logo,
      idealUsers,
    };

    addStartup(startup);
    navigate(`/startup/${startup.id}`);
  };

  const addIdealUser = () => {
    if (idealUser.trim() && !idealUsers.includes(idealUser.trim())) {
      setIdealUsers([...idealUsers, idealUser.trim()]);
      setIdealUser('');
    }
  };

  const removeIdealUser = (index: number) => {
    setIdealUsers(idealUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Your Startup</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Startup Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Description
          </label>
          <textarea
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Founder Name
          </label>
          <input
            type="text"
            required
            value={founderName}
            onChange={(e) => setFounderName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo URL (optional)
          </label>
          <input
            type="url"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ideal Users
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={idealUser}
              onChange={(e) => setIdealUser(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add user type"
            />
            <button
              type="button"
              onClick={addIdealUser}
              className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {idealUsers.map((user, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {user}
                <button
                  type="button"
                  onClick={() => removeIdealUser(index)}
                  className="ml-2 inline-flex items-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Startup
        </button>
      </form>
    </div>
  );
}
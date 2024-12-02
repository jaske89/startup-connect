import { Link, useLocation } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Rocket, User, Plus, BarChart3 } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Rocket className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  StartupConnect
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <SignedIn>
                <Link
                  to="/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Startup
                </Link>
                
                <Link
                  to="/founder-dashboard"
                  className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    location.pathname === '/founder-dashboard'
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Founder Dashboard
                </Link>
                
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    location.pathname === '/dashboard'
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  User Dashboard
                </Link>
                
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} StartupConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { AuthenticatedRoute } from '../components/auth/AuthenticatedRoute';
import { Home } from '../pages/Home';
import { StartupDetails } from '../pages/StartupDetails';
import { CreateStartup } from '../pages/CreateStartup';
import { UserDashboard } from '../pages/UserDashboard';
import { FounderDashboard } from '../pages/FounderDashboard';

const appearance = {
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
  },
  elements: {
    rootBox: "mx-auto my-8",
    card: "mx-auto max-w-[450px] w-full rounded-xl shadow-lg",
    header: "text-center",
    headerTitle: "text-2xl font-semibold text-gray-900",
    headerSubtitle: "text-gray-600",
    socialButtons: "space-y-2",
    dividerBox: "my-6",
    dividerLine: "bg-gray-200",
    dividerText: "text-gray-600",
    formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    formFieldInput: "rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
    formFieldLabel: "text-gray-700",
    footerActionText: "text-gray-600",
    footerActionLink: "text-indigo-600 hover:text-indigo-700",
    identityPreviewEditButton: "text-indigo-600 hover:text-indigo-700",
  },
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/sign-in/*" 
        element={
          <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
            <SignIn 
              routing="path" 
              path="/sign-in" 
              appearance={appearance}
            />
          </div>
        } 
      />
      <Route 
        path="/sign-up/*" 
        element={
          <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
            <SignUp 
              routing="path" 
              path="/sign-up" 
              appearance={appearance}
              signUpUrl="/sign-up"
              afterSignUpUrl="/dashboard"
              hcaptchaConfiguration={{
                siteKey: import.meta.env.VITE_HCAPTCHA_SITE_KEY
              }}
            />
          </div>
        } 
      />
      
      <Route
        path="/startup/:id"
        element={
          <AuthenticatedRoute>
            <StartupDetails />
          </AuthenticatedRoute>
        }
      />
      
      <Route
        path="/create"
        element={
          <AuthenticatedRoute>
            <CreateStartup />
          </AuthenticatedRoute>
        }
      />
      
      <Route
        path="/dashboard"
        element={
          <AuthenticatedRoute>
            <UserDashboard />
          </AuthenticatedRoute>
        }
      />
      
      <Route
        path="/founder-dashboard"
        element={
          <AuthenticatedRoute>
            <FounderDashboard />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  );
}
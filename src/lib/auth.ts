import { useUser } from '@clerk/clerk-react';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    user,
    isLoaded,
    isSignedIn,
    isFounder: isSignedIn && user?.publicMetadata?.role === 'founder',
    userId: user?.id,
  };
}
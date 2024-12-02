export interface Startup {
  id: string;
  name: string;
  description: string;
  service: string;
  idealUsers: string[];
  founderName: string;
  logo?: string;
  visits?: number;
  activeUsers?: number;
}

export interface Contribution {
  id: string;
  startupId: string;
  userId: string;
  content: string;
  type: 'comment' | 'suggestion';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  tokens: number;
  contributions: Contribution[];
}

import React, { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Simplified auth context that always returns a fake user for development
const DEV_FAKE_USER: User = {
  id: "dev-user-id",
  app_metadata: { provider: "dev" },
  user_metadata: { email: "dev@local.test", name: "Dev User" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "dev@local.test",
  phone: null,
  confirmation_sent_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
  recovery_sent_at: null,
  last_sign_in_at: new Date().toISOString(),
  role: "authenticated",
  updated_at: new Date().toISOString(),
  identities: [],
  factors: null,
  email_confirmed_at: new Date().toISOString(),
  phone_confirmed_at: null,
};

const DEV_FAKE_SESSION: Session = {
  access_token: "dev-token",
  token_type: "bearer",
  expires_in: 3600 * 24 * 365,
  refresh_token: "dev-refresh",
  user: DEV_FAKE_USER,
  provider_token: null,
  provider_refresh_token: null,
  expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always return fake user and no loading for development
  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    return { error: null };
  };

  const signOut = async () => {
    // No-op for development
  };

  const signInWithGoogle = async () => {
    return { error: null };
  };

  const value = {
    user: DEV_FAKE_USER,
    session: DEV_FAKE_SESSION,
    loading: false,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

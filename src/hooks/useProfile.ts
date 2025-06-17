
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logSecurityEvent } from "@/lib/securityLogger";
import type { Json } from "@/integrations/supabase/types";

export type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  timezone: string;
  language: string;
  notification_preferences: {
    email: boolean;
    push: boolean;
    security_alerts: boolean;
  };
  security_preferences: {
    two_factor_enabled: boolean;
    login_notifications: boolean;
    session_timeout: number;
  };
  email_verified: boolean;
  created_at: string;
  updated_at: string;
};

// Helper function to safely parse JSON preferences
const parsePreferences = <T>(preferences: Json | null, defaultValue: T): T => {
  if (!preferences) return defaultValue;
  if (typeof preferences === 'object' && preferences !== null) {
    return preferences as T;
  }
  return defaultValue;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      
      // Transform the data to match our UserProfile type
      const transformedProfile: UserProfile = {
        ...data,
        notification_preferences: parsePreferences(data.notification_preferences, {
          email: true,
          push: true,
          security_alerts: true
        }),
        security_preferences: parsePreferences(data.security_preferences, {
          two_factor_enabled: false,
          login_notifications: true,
          session_timeout: 30
        })
      };
      
      setProfile(transformedProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Transform the updated data to match our UserProfile type
      const transformedProfile: UserProfile = {
        ...data,
        notification_preferences: parsePreferences(data.notification_preferences, {
          email: true,
          push: true,
          security_alerts: true
        }),
        security_preferences: parsePreferences(data.security_preferences, {
          two_factor_enabled: false,
          login_notifications: true,
          session_timeout: 30
        })
      };
      
      setProfile(transformedProfile);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      logSecurityEvent({
        event: "profile_updated",
        userId: user.id,
        detail: { updated_fields: Object.keys(updates) },
      });

      return transformedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
      return null;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      await updateProfile({ avatar_url: data.publicUrl });

      logSecurityEvent({
        event: "avatar_updated",
        userId: user.id,
      });

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile,
  };
};

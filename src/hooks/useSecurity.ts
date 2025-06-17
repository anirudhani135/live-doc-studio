
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export type SecurityAuditLog = {
  id: string;
  user_id: string;
  event_type: string;
  event_data: any;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
  created_at: string;
};

export type UserSession = {
  id: string;
  user_id: string;
  session_token: string;
  device_info: any;
  ip_address: string | null;
  last_activity: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
};

export const useSecurity = () => {
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAuditLogs = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("security_audit_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Transform the data to match our SecurityAuditLog type
      const transformedLogs: SecurityAuditLog[] = (data || []).map(log => ({
        ...log,
        ip_address: log.ip_address ? String(log.ip_address) : null,
        user_id: log.user_id || user.id
      }));
      
      setAuditLogs(transformedLogs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    }
  };

  const fetchActiveSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("user_sessions")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("last_activity", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our UserSession type
      const transformedSessions: UserSession[] = (data || []).map(session => ({
        ...session,
        ip_address: session.ip_address ? String(session.ip_address) : null,
        last_activity: session.last_activity || new Date().toISOString(),
        created_at: session.created_at || new Date().toISOString()
      }));
      
      setActiveSessions(transformedSessions);
    } catch (error) {
      console.error("Error fetching active sessions:", error);
    }
  };

  const terminateSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from("user_sessions")
        .update({ is_active: false })
        .eq("id", sessionId)
        .eq("user_id", user?.id);

      if (error) throw error;

      setActiveSessions(prev => 
        prev.filter(session => session.id !== sessionId)
      );

      toast({
        title: "Session terminated",
        description: "The session has been terminated successfully.",
      });
    } catch (error) {
      console.error("Error terminating session:", error);
      toast({
        title: "Error",
        description: "Failed to terminate session.",
        variant: "destructive",
      });
    }
  };

  const logSecurityAudit = async (
    eventType: string,
    eventData?: any,
    success: boolean = true
  ) => {
    if (!user) return;

    try {
      await supabase
        .from("security_audit_logs")
        .insert([{
          user_id: user.id,
          event_type: eventType,
          event_data: eventData,
          success,
        }]);
    } catch (error) {
      console.error("Error logging security audit:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAuditLogs(), fetchActiveSessions()]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  return {
    auditLogs,
    activeSessions,
    loading,
    terminateSession,
    logSecurityAudit,
    refetch: async () => {
      await Promise.all([fetchAuditLogs(), fetchActiveSessions()]);
    },
  };
};

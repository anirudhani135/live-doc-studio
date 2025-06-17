
import React, { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useSecurity } from '@/hooks/useSecurity';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Smartphone, 
  Monitor, 
  Clock, 
  AlertTriangle,
  Key,
  LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export const SecuritySettings = () => {
  const { user, signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { auditLogs, activeSessions, terminateSession, loading } = useSecurity();
  const { toast } = useToast();
  const [changingPassword, setChangingPassword] = useState(false);

  const handleSecurityUpdate = async (field: string, value: any) => {
    if (!profile) return;
    
    await updateProfile({
      security_preferences: {
        ...profile.security_preferences,
        [field]: value,
      }
    });
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      console.error('Error sending password reset:', error);
      toast({
        title: "Error",
        description: "Failed to send password reset email.",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const getDeviceIcon = (deviceInfo: any) => {
    if (deviceInfo?.isMobile) return <Smartphone size={16} />;
    return <Monitor size={16} />;
  };

  if (loading || !profile) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            Security Overview
          </CardTitle>
          <CardDescription>
            Monitor and manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Shield size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Account Protected</p>
                <p className="text-sm text-muted-foreground">
                  Password authentication enabled
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Key size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground">
                  {activeSessions.length} active session(s)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
          <CardDescription>
            Configure your security settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={profile.security_preferences.two_factor_enabled}
                onCheckedChange={(checked) =>
                  handleSecurityUpdate('two_factor_enabled', checked)
                }
              />
              {profile.security_preferences.two_factor_enabled && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Enabled
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Login Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when someone signs into your account
              </p>
            </div>
            <Switch
              checked={profile.security_preferences.login_notifications}
              onCheckedChange={(checked) =>
                handleSecurityUpdate('login_notifications', checked)
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <p className="text-sm text-muted-foreground">
              Automatically log out after {profile.security_preferences.session_timeout} minutes of inactivity
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
          <CardDescription>
            Manage your password and authentication methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Password</h4>
              <p className="text-sm text-muted-foreground">
                Last changed: Unknown
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleChangePassword}
              disabled={changingPassword}
            >
              {changingPassword ? 'Sending...' : 'Change Password'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Monitor and manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeSessions.length === 0 ? (
            <p className="text-muted-foreground">No active sessions found.</p>
          ) : (
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(session.device_info)}
                    <div>
                      <p className="font-medium">
                        {session.device_info?.browser || 'Unknown Browser'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.ip_address} • Last active {format(new Date(session.last_activity), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => terminateSession(session.id)}
                  >
                    <LogOut size={14} className="mr-2" />
                    Terminate
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
          <CardDescription>
            View recent security events for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <p className="text-muted-foreground">No security activity found.</p>
          ) : (
            <div className="space-y-3">
              {auditLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`p-2 rounded-full ${
                    log.success ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {log.success ? (
                      <Shield size={14} className="text-green-600" />
                    ) : (
                      <AlertTriangle size={14} className="text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium capitalize">
                      {log.event_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(log.created_at), 'MMM d, yyyy h:mm a')}
                      {log.ip_address && ` • ${log.ip_address}`}
                    </p>
                  </div>
                  <Badge variant={log.success ? "secondary" : "destructive"}>
                    {log.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          If you notice any suspicious activity, please change your password immediately 
          and contact our support team.
        </AlertDescription>
      </Alert>
    </div>
  );
};

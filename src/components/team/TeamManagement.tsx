
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Settings, 
  Crown, 
  Shield, 
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joined_at: string;
  last_active: string;
}

interface TeamInvite {
  id: string;
  email: string;
  role: string;
  invited_by: string;
  invited_at: string;
  status: 'pending' | 'accepted' | 'expired';
}

const TeamManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<TeamInvite[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');

  // Mock data - in real app this would come from Supabase
  useEffect(() => {
    const mockTeamMembers: TeamMember[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'owner',
        status: 'active',
        joined_at: '2024-01-15',
        last_active: '2024-01-20'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
        status: 'active',
        joined_at: '2024-01-16',
        last_active: '2024-01-19'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'editor',
        status: 'active',
        joined_at: '2024-01-18',
        last_active: '2024-01-20'
      }
    ];

    const mockPendingInvites: TeamInvite[] = [
      {
        id: '1',
        email: 'sarah@example.com',
        role: 'editor',
        invited_by: 'John Doe',
        invited_at: '2024-01-19',
        status: 'pending'
      }
    ];

    setTeamMembers(mockTeamMembers);
    setPendingInvites(mockPendingInvites);
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'editor':
        return <Edit className="h-4 w-4 text-green-600" />;
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-100 text-yellow-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'editor':
        return 'bg-green-100 text-green-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInviteUser = async () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    // Check if user is already a member or has pending invite
    const existingMember = teamMembers.find(m => m.email === inviteEmail);
    const existingInvite = pendingInvites.find(i => i.email === inviteEmail);

    if (existingMember) {
      toast({
        title: "User Already Member",
        description: "This user is already a team member",
        variant: "destructive",
      });
      return;
    }

    if (existingInvite) {
      toast({
        title: "Invite Already Sent",
        description: "An invite has already been sent to this email",
        variant: "destructive",
      });
      return;
    }

    // Create new invite
    const newInvite: TeamInvite = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invited_by: user?.email?.split('@')[0] || 'Unknown',
      invited_at: new Date().toISOString(),
      status: 'pending'
    };

    setPendingInvites(prev => [...prev, newInvite]);
    setInviteEmail('');
    setInviteRole('editor');
    setShowInviteDialog(false);

    toast({
      title: "Invite Sent",
      description: `Team invite sent to ${inviteEmail}`,
    });
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole as TeamMember['role'] } : member
    ));

    toast({
      title: "Role Updated",
      description: "Team member role has been updated",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    
    toast({
      title: "Member Removed",
      description: "Team member has been removed",
    });
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvites(prev => prev.filter(invite => invite.id !== inviteId));
    
    toast({
      title: "Invite Cancelled",
      description: "Team invite has been cancelled",
    });
  };

  const canManageMembers = (userRole: string, targetRole: string) => {
    const roleHierarchy = { owner: 4, admin: 3, editor: 2, viewer: 1 };
    const currentUserRole = teamMembers.find(m => m.email === user?.email)?.role || 'viewer';
    
    return roleHierarchy[currentUserRole] > roleHierarchy[targetRole];
  };

  const currentUserRole = teamMembers.find(m => m.email === user?.email)?.role || 'viewer';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and permissions
          </p>
        </div>
        
        {(currentUserRole === 'owner' || currentUserRole === 'admin') && (
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteUser}>
                    Send Invite
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Total Members</span>
            </div>
            <p className="text-2xl font-bold mt-1">{teamMembers.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Pending Invites</span>
            </div>
            <p className="text-2xl font-bold mt-1">{pendingInvites.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Admins</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">Active Today</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {teamMembers.filter(m => m.last_active === new Date().toISOString().split('T')[0]).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      {member.id === user?.id && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{member.email}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last active: {new Date(member.last_active).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {canManageMembers(currentUserRole, member.role) && member.id !== user?.id && (
                    <div className="flex items-center gap-2">
                      <Select
                        value={member.role}
                        onValueChange={(value) => handleRoleChange(member.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                  <div>
                    <span className="font-medium">{invite.email}</span>
                    <div className="text-sm text-muted-foreground">
                      Invited as {invite.role} by {invite.invited_by} on{' '}
                      {new Date(invite.invited_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-yellow-800">
                      Pending
                    </Badge>
                    {(currentUserRole === 'owner' || currentUserRole === 'admin') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelInvite(invite.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Owner</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full access to all features</li>
                <li>• Manage team members</li>
                <li>• Billing and settings</li>
                <li>• Delete workspace</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Admin</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Invite team members</li>
                <li>• Manage roles</li>
                <li>• Access all projects</li>
                <li>• Workspace settings</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-green-600" />
                <span className="font-medium">Editor</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create and edit projects</li>
                <li>• Share documents</li>
                <li>• Use AI features</li>
                <li>• Comment and collaborate</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Viewer</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View shared projects</li>
                <li>• Read documentation</li>
                <li>• Add comments</li>
                <li>• Export documents</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;

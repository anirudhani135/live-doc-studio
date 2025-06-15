
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Eye, 
  Edit, 
  Save, 
  Undo, 
  Redo,
  MessageSquare,
  Share,
  Lock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  cursor_position?: number;
  is_editing?: boolean;
  color: string;
}

interface Comment {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  position: number;
  created_at: string;
}

interface RealTimeEditorProps {
  documentId: string;
  initialContent?: string;
  onSave: (content: string) => void;
  readonly?: boolean;
}

const RealTimeEditor: React.FC<RealTimeEditorProps> = ({ 
  documentId, 
  initialContent = '', 
  onSave,
  readonly = false 
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState(initialContent);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const channelRef = useRef<any>(null);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  useEffect(() => {
    if (!user || !documentId) return;

    // Set up real-time collaboration
    const channel = supabase.channel(`document-${documentId}`)
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users = Object.values(newState).flat() as any[];
        
        const activeCollaborators: Collaborator[] = users.map((u, index) => ({
          id: u.user_id,
          name: u.user_name || 'Anonymous',
          avatar: u.avatar_url,
          cursor_position: u.cursor_position,
          is_editing: u.is_editing,
          color: colors[index % colors.length]
        }));
        
        setCollaborators(activeCollaborators);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .on('broadcast', { event: 'content-change' }, ({ payload }) => {
        if (payload.user_id !== user.id) {
          setContent(payload.content);
        }
      })
      .on('broadcast', { event: 'cursor-move' }, ({ payload }) => {
        if (payload.user_id !== user.id) {
          // Update cursor position for other users
          setCollaborators(prev => prev.map(c => 
            c.id === payload.user_id 
              ? { ...c, cursor_position: payload.position }
              : c
          ));
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          
          // Track user presence
          await channel.track({
            user_id: user.id,
            user_name: user.email?.split('@')[0] || 'Anonymous',
            avatar_url: user.user_metadata?.avatar_url,
            cursor_position: 0,
            is_editing: false
          });
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [user, documentId]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Broadcast content changes to other users
    if (channelRef.current && user) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'content-change',
        payload: {
          content: newContent,
          user_id: user.id
        }
      });
    }
  };

  const handleCursorMove = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const position = e.target.selectionStart;
    
    // Broadcast cursor position to other users
    if (channelRef.current && user) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'cursor-move',
        payload: {
          position,
          user_id: user.id
        }
      });
    }
  };

  const handleSave = () => {
    onSave(content);
  };

  const addComment = () => {
    if (!newComment.trim() || selectedPosition === null) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user_id: user?.id || '',
      user_name: user?.email?.split('@')[0] || 'Anonymous',
      content: newComment,
      position: selectedPosition,
      created_at: new Date().toISOString()
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setSelectedPosition(null);
  };

  const getContentWithCursors = () => {
    let contentWithCursors = content;
    const sortedCollaborators = [...collaborators].sort((a, b) => 
      (b.cursor_position || 0) - (a.cursor_position || 0)
    );

    sortedCollaborators.forEach(collaborator => {
      if (collaborator.cursor_position !== undefined && collaborator.id !== user?.id) {
        const position = Math.min(collaborator.cursor_position, contentWithCursors.length);
        const cursor = `<span class="inline-block w-0.5 h-4 animate-pulse" style="background-color: ${collaborator.color}"></span>`;
        contentWithCursors = 
          contentWithCursors.slice(0, position) + 
          cursor + 
          contentWithCursors.slice(position);
      }
    });

    return contentWithCursors;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Collaboration Bar */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">{collaborators.length} collaborator(s)</span>
              </div>
              
              <div className="flex -space-x-2">
                {collaborators.slice(0, 5).map((collaborator) => (
                  <Avatar key={collaborator.id} className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback 
                      className="text-xs"
                      style={{ backgroundColor: collaborator.color }}
                    >
                      {collaborator.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {collaborators.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs">+{collaborators.length - 5}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({comments.length})
              </Button>
              
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              {!readonly && (
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 flex gap-4">
        {/* Editor */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Document Editor
              {readonly && <Lock className="h-4 w-4 text-muted-foreground" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="relative h-full">
              <Textarea
                ref={editorRef}
                value={content}
                onChange={(e) => {
                  handleContentChange(e.target.value);
                  handleCursorMove(e);
                }}
                onSelect={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  setSelectedPosition(target.selectionStart);
                }}
                placeholder="Start writing your document..."
                className="h-full min-h-[400px] resize-none"
                readOnly={readonly}
              />
              
              {/* Active collaborators indicator */}
              {collaborators.filter(c => c.is_editing && c.id !== user?.id).map(collaborator => (
                <div
                  key={collaborator.id}
                  className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded shadow"
                >
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: collaborator.color }}
                  />
                  {collaborator.name} is editing
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments Sidebar */}
        {showComments && (
          <Card className="w-80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{comment.user_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Position: {comment.position}
                    </Badge>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No comments yet. Select text and add a comment.
                  </p>
                )}
              </div>
              
              {selectedPosition !== null && (
                <div className="space-y-2 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Add comment at position {selectedPosition}</span>
                  </div>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="h-20"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addComment}>
                      Add Comment
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setSelectedPosition(null);
                        setNewComment('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RealTimeEditor;

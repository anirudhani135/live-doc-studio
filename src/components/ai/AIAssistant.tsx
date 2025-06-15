
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { aiContentService } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you generate documentation, improve content, analyze code, and answer questions. What would you like to work on?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiContentService.generateContent({
        prompt: input,
        type: 'documentation',
        context: 'AI Assistant conversation'
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: 'Generate API Docs', prompt: 'Help me create API documentation' },
    { label: 'Write README', prompt: 'Help me write a comprehensive README file' },
    { label: 'Create User Guide', prompt: 'Help me create a user guide' },
    { label: 'Code Review', prompt: 'Help me review and document code' }
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Bot className="h-4 w-4" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3 space-y-3">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  {message.type === 'user' ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                </div>
                <div
                  className={`px-3 py-2 rounded-lg text-xs ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="px-3 py-2 rounded-lg bg-muted text-xs flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {quickActions.map((action, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-muted"
                onClick={() => setInput(action.prompt)}
              >
                {action.label}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="text-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;

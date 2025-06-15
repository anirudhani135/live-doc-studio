
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, FileText, Loader2 } from 'lucide-react';
import { aiContentService } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';

interface AISpecGeneratorProps {
  onSpecGenerated?: (spec: any) => void;
}

const AISpecGenerator: React.FC<AISpecGeneratorProps> = ({ onSpecGenerated }) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState(null);
  const { toast } = useToast();

  const handleGenerateSpec = async () => {
    if (!description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please provide a project description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await aiContentService.generateSpecFromDescription(description);
      setGeneratedSpec(response);
      onSpecGenerated?.(response);
      
      toast({
        title: "Specification Generated",
        description: "AI has created a comprehensive specification for your project",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate specification",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-blue-600" />
          AI Specification Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project in detail. Include goals, features, target audience, and any specific requirements..."
            className="min-h-[120px]"
          />
        </div>
        
        <Button
          onClick={handleGenerateSpec}
          disabled={!description.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Specification...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Generate AI Specification
            </>
          )}
        </Button>

        {generatedSpec && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Generated</Badge>
              <span className="text-sm font-medium">AI Specification Ready</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Timeline:</span> {generatedSpec.timeline_estimate}
              </div>
              <div>
                <span className="font-medium">Tech Stack:</span> {generatedSpec.tech_recommendations.join(', ')}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Full specification available in the generated document
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISpecGenerator;

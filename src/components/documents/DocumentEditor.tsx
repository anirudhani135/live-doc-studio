
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Save, Wand2, FileText, Code, BookOpen, ArrowLeft } from 'lucide-react';
import { Document } from '@/hooks/useDocuments';
import { aiContentService, AIGenerationRequest } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';

interface DocumentEditorProps {
  document: Document;
  onSave: (content: string, metadata?: any) => void;
  onBack: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ document, onSave, onBack }) => {
  const [content, setContent] = useState(document.content || '');
  const [title, setTitle] = useState(document.title);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  const { toast } = useToast();

  const handleAIGenerate = async (type: AIGenerationRequest['type'], prompt?: string) => {
    setIsGenerating(true);
    try {
      const request: AIGenerationRequest = {
        prompt: prompt || `Generate ${type} content for: ${title}`,
        type,
        context: content,
        model: 'gpt-4'
      };

      const response = await aiContentService.generateContent(request);
      
      if (type === 'improvement') {
        setContent(response.content);
      } else {
        setContent(prev => prev + '\n\n' + response.content);
      }
      
      setAiSuggestions(response.suggestions);
      toast({
        title: "AI Content Generated",
        description: `Generated ${type} content successfully`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI content",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImproveDocument = async (improvementType: 'clarity' | 'completeness' | 'structure') => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Add some content before improving the document",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await aiContentService.improveDocument(content, improvementType);
      setContent(response.improved_content);
      
      toast({
        title: "Document Improved",
        description: `Improved for ${improvementType}. Quality score: ${response.quality_score}/10`,
      });
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: "Failed to improve document",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const metadata = {
      ...document.metadata,
      ai_suggestions: aiSuggestions,
      last_ai_generation: new Date().toISOString()
    };
    onSave(content, metadata);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold border-none px-0 focus-visible:ring-0"
              placeholder="Document title"
            />
            <Badge variant="outline">{document.doc_type}</Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your document content here..."
                className="min-h-[500px] font-mono text-sm"
              />
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Quick AI Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleAIGenerate('documentation')}
                    disabled={isGenerating}
                  >
                    <FileText className="h-3 w-3 mr-2" />
                    Generate Docs
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleAIGenerate('specification')}
                    disabled={isGenerating}
                  >
                    <BookOpen className="h-3 w-3 mr-2" />
                    Create Spec
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleImproveDocument('clarity')}
                    disabled={isGenerating || !content.trim()}
                  >
                    <Wand2 className="h-3 w-3 mr-2" />
                    Improve Clarity
                  </Button>
                </CardContent>
              </Card>

              {aiSuggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">AI Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                        <div key={index} className="text-xs p-2 bg-muted rounded">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAIGenerate('documentation')}
                    disabled={isGenerating}
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAIGenerate('specification')}
                    disabled={isGenerating}
                  >
                    Specification
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Custom Prompt</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter custom prompt..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAIGenerate('documentation', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button size="sm" disabled={isGenerating}>
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Document Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleImproveDocument('clarity')}
                    disabled={isGenerating || !content.trim()}
                  >
                    Improve Clarity
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleImproveDocument('completeness')}
                    disabled={isGenerating || !content.trim()}
                  >
                    Add Missing Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleImproveDocument('structure')}
                    disabled={isGenerating || !content.trim()}
                  >
                    Restructure Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{content || 'No content to preview'}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                <div>
                  <div className="font-medium">AI is working...</div>
                  <div className="text-sm text-muted-foreground">Generating content</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;

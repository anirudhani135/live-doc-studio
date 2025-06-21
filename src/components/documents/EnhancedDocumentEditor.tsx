
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, Save, Wand2, FileText, Code, BookOpen, ArrowLeft, 
  Eye, Edit3, Zap, CheckCircle, AlertTriangle, Loader2
} from 'lucide-react';
import { Document } from '@/hooks/useDocuments';
import { aiContentService, AIGenerationRequest } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';
import { useSecurityValidation } from '@/hooks/useSecurityValidation';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedDocumentEditorProps {
  document: Document;
  onSave: (content: string, metadata?: any) => void;
  onBack: () => void;
}

const EnhancedDocumentEditor: React.FC<EnhancedDocumentEditorProps> = ({ 
  document, 
  onSave, 
  onBack 
}) => {
  const [content, setContent] = useState(document.content || '');
  const [title, setTitle] = useState(document.title);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const { toast } = useToast();
  const { validateInput, sanitizeInput } = useSecurityValidation();

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [content, title]);

  const aiActions = [
    {
      icon: <FileText className="h-4 w-4" />,
      label: 'Generate Documentation',
      description: 'Create comprehensive docs',
      action: () => handleAIGenerate('documentation'),
      color: 'bg-blue-500/10 text-blue-600 border-blue-200'
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: 'Create Specification',
      description: 'Technical specifications',
      action: () => handleAIGenerate('specification'),
      color: 'bg-purple-500/10 text-purple-600 border-purple-200'
    },
    {
      icon: <Wand2 className="h-4 w-4" />,
      label: 'Improve Clarity',
      description: 'Enhance readability',
      action: () => handleImproveDocument('clarity'),
      color: 'bg-green-500/10 text-green-600 border-green-200',
      disabled: !content.trim()
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: 'Add Details',
      description: 'Expand content',
      action: () => handleImproveDocument('completeness'),
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
      disabled: !content.trim()
    }
  ];

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
        title: "✨ AI Content Generated",
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
        title: "✨ Document Improved",
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
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedContent = sanitizeInput(content);
    
    const validation = validateInput(sanitizedContent, 'content');
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.violations.join(', '),
        variant: "destructive",
      });
      return;
    }

    const metadata = {
      ...document.metadata,
      ai_suggestions: aiSuggestions,
      last_ai_generation: new Date().toISOString(),
      word_count: sanitizedContent.split(' ').length,
      char_count: sanitizedContent.length
    };
    
    onSave(sanitizedContent, metadata);
    setHasUnsavedChanges(false);
    setLastSaved(new Date());
    
    toast({
      title: "✅ Document Saved",
      description: "Your changes have been saved successfully",
    });
  };

  const wordCount = content.split(' ').filter(word => word.length > 0).length;
  const charCount = content.length;
  const estimatedReadTime = Math.ceil(wordCount / 200);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Button variant="ghost" size="sm" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="min-w-0 flex-1 max-w-md">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:bg-muted/50 rounded-md"
                placeholder="Document title..."
              />
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{document.doc_type}</Badge>
                {lastSaved && (
                  <span className="text-xs text-muted-foreground">
                    Last saved {lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-xs text-muted-foreground hidden sm:block">
              {wordCount} words • {estimatedReadTime} min read
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={!hasUnsavedChanges}
              className="flex items-center gap-2"
            >
              {hasUnsavedChanges ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Saved
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-fit grid-cols-3">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="editor" className="h-full m-0 p-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <div className="lg:col-span-3 flex flex-col">
                  <Label htmlFor="content" className="sr-only">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your document content here..."
                    className="flex-1 min-h-[500px] font-mono text-sm resize-none border-2 focus:border-primary transition-colors"
                  />
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{charCount} characters</span>
                    <span>{wordCount} words</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Quick AI Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {aiActions.map((action, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className={`w-full justify-start text-left h-auto p-3 ${action.color}`}
                            onClick={action.action}
                            disabled={isGenerating || action.disabled}
                          >
                            <div className="flex items-start gap-2 w-full">
                              {action.icon}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-xs">{action.label}</div>
                                <div className="text-xs opacity-70 mt-1">{action.description}</div>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <AnimatePresence>
                    {aiSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">💡 AI Suggestions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="text-xs p-2 bg-muted rounded border-l-2 border-primary/50"
                                >
                                  {suggestion}
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-tools" className="h-full m-0 p-4 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {/* Content Generation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Content Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {aiActions.slice(0, 2).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={action.action}
                          disabled={isGenerating}
                          className="justify-start h-auto p-4"
                        >
                          <div className="flex items-center gap-3">
                            {action.icon}
                            <div className="text-left">
                              <div className="font-medium">{action.label}</div>
                              <div className="text-xs text-muted-foreground">{action.description}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Document Improvement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-green-600" />
                      Document Enhancement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {aiActions.slice(2).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={action.action}
                          disabled={isGenerating || action.disabled}
                          className="justify-start h-auto p-4"
                        >
                          <div className="flex items-center gap-3">
                            {action.icon}
                            <div className="text-left">
                              <div className="font-medium">{action.label}</div>
                              <div className="text-xs text-muted-foreground">{action.description}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                    
                    {!content.trim() && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          Add some content to enable document enhancement features
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="h-full m-0 p-4 overflow-auto">
              <Card className="max-w-4xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Document Preview</span>
                    <div className="text-sm font-normal text-muted-foreground">
                      {estimatedReadTime} min read
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {content || (
                        <div className="text-center py-12 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No content to preview</p>
                          <p className="text-xs">Start writing in the editor to see a preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Card className="max-w-sm mx-4">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div>
                      <div className="font-medium">AI is working...</div>
                      <div className="text-sm text-muted-foreground">Generating content</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedDocumentEditor;

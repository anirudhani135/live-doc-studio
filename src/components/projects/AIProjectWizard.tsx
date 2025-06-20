import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { aiContentService } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/project';

interface AIProjectWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AIModel = 'gpt-4' | 'claude' | 'gemini';

const AIProjectWizard: React.FC<AIProjectWizardProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    aiModel: 'gpt-4' as AIModel,
    projectType: '',
    techStack: [],
    features: [],
    timeline: '',
    generatedSpec: null,
    architecture: null
  });

  const { createProject } = useProjects();
  const { toast } = useToast();

  const steps = [
    'Project Description',
    'AI Model Selection', 
    'Project Type',
    'Technical Requirements',
    'AI Analysis',
    'Specification Review',
    'Architecture Design',
    'Final Review',
    'Project Creation'
  ];

  // Map project types to valid Project type values
  const getProjectType = (projectType: string): Project['type'] => {
    switch (projectType) {
      case 'web-app':
      case 'mobile-app':
      case 'saas':
      case 'ecommerce':
      case 'analytics':
        return 'code_project';
      case 'api':
        return 'api_spec';
      case 'cms':
      case 'other':
      default:
        return 'documentation';
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 5) {
      // AI Analysis step
      await performAIAnalysis();
    } else if (currentStep === 9) {
      // Final step - create project
      await createProjectWithAI();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const performAIAnalysis = async () => {
    setIsGenerating(true);
    try {
      // Generate comprehensive specification
      const specResponse = await aiContentService.generateSpecFromDescription(
        `${projectData.description}\n\nProject Type: ${projectData.projectType}\nTech Stack: ${projectData.techStack.join(', ')}`
      );
      
      setProjectData(prev => ({
        ...prev,
        generatedSpec: specResponse.specification,
        architecture: specResponse.architecture,
        timeline: specResponse.timeline_estimate
      }));

      toast({
        title: "AI Analysis Complete",
        description: "Generated comprehensive project specification and architecture",
      });

      setCurrentStep(6);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI analysis",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const createProjectWithAI = async () => {
    setIsGenerating(true);
    try {
      await createProject({
        name: projectData.name,
        description: projectData.description,
        type: getProjectType(projectData.projectType),
        tech_stack: projectData.techStack,
        ai_model: projectData.aiModel,
        metadata: {
          ai_model: projectData.aiModel,
          features: projectData.features,
          generated_spec: projectData.generatedSpec,
          architecture: projectData.architecture,
          timeline_estimate: projectData.timeline,
          ai_generated: true,
          creation_date: new Date().toISOString()
        }
      });

      toast({
        title: "Project Created Successfully",
        description: "Your AI-powered project has been created with comprehensive documentation",
      });

      onOpenChange(false);
      setCurrentStep(1);
      setProjectData({
        name: '',
        description: '',
        aiModel: 'gpt-4' as AIModel,
        projectType: '',
        techStack: [],
        features: [],
        timeline: '',
        generatedSpec: null,
        architecture: null
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectData.name}
                onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your project name"
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your project goals, target audience, and key features..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label>Select AI Model</Label>
            <div className="grid gap-3">
              {(['gpt-4', 'claude', 'gemini'] as AIModel[]).map((model) => (
                <Card
                  key={model}
                  className={`cursor-pointer transition-colors ${
                    projectData.aiModel === model ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setProjectData(prev => ({ ...prev, aiModel: model }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{model.toUpperCase()}</h4>
                        <p className="text-sm text-muted-foreground">
                          {model === 'gpt-4' && 'Best for comprehensive analysis and coding'}
                          {model === 'claude' && 'Excellent for detailed documentation'}
                          {model === 'gemini' && 'Great for creative and technical solutions'}
                        </p>
                      </div>
                      {projectData.aiModel === model && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label>Project Type</Label>
            <Select value={projectData.projectType} onValueChange={(value) => setProjectData(prev => ({ ...prev, projectType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-app">Web Application</SelectItem>
                <SelectItem value="mobile-app">Mobile Application</SelectItem>
                <SelectItem value="api">API/Backend Service</SelectItem>
                <SelectItem value="saas">SaaS Platform</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="cms">Content Management</SelectItem>
                <SelectItem value="analytics">Analytics Dashboard</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label>Technology Stack (Select multiple)</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
                'Supabase', 'Tailwind CSS', 'Python', 'Docker',
                'AWS', 'Firebase', 'MongoDB', 'Redis'
              ].map((tech) => (
                <Badge
                  key={tech}
                  variant={projectData.techStack.includes(tech) ? 'default' : 'outline'}
                  className="cursor-pointer justify-center p-2"
                  onClick={() => {
                    setProjectData(prev => ({
                      ...prev,
                      techStack: prev.techStack.includes(tech)
                        ? prev.techStack.filter(t => t !== tech)
                        : [...prev.techStack, tech]
                    }));
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              {isGenerating ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                <Sparkles className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Analysis in Progress</h3>
              <p className="text-muted-foreground">
                Our AI is analyzing your project requirements and generating comprehensive specifications...
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Generated Specification</h3>
            <div className="max-h-60 overflow-y-auto p-4 bg-muted rounded-lg">
              <div className="whitespace-pre-wrap text-sm">
                {projectData.generatedSpec || 'Specification will appear here...'}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">System Architecture</h3>
            <div className="max-h-60 overflow-y-auto p-4 bg-muted rounded-lg">
              <div className="whitespace-pre-wrap text-sm">
                {projectData.architecture || 'Architecture will appear here...'}
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Timeline Estimate:</strong> {projectData.timeline}
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Project Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Project Name</div>
                <div className="text-sm text-muted-foreground">{projectData.name}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">AI Model</div>
                <div className="text-sm text-muted-foreground">{projectData.aiModel.toUpperCase()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Tech Stack</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {projectData.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              {isGenerating ? (
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Creating Your Project</h3>
              <p className="text-muted-foreground">
                Setting up your AI-powered project with all generated documentation...
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return projectData.name && projectData.description;
      case 2: return projectData.aiModel;
      case 3: return projectData.projectType;
      case 4: return projectData.techStack.length > 0;
      case 5: return !isGenerating;
      default: return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Project Wizard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / steps.length) * 100)}%
              </span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} />
          </div>

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1 || isGenerating}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNextStep}
              disabled={!canProceed() || isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : currentStep === steps.length ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <ArrowRight className="h-4 w-4 mr-2" />
              )}
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProjectWizard;


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
import { aiContentService } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/project';

// Import wizard step components
import ProjectDescriptionStep from './wizard/ProjectDescriptionStep';
import AIModelSelectionStep from './wizard/AIModelSelectionStep';
import ProjectTypeStep from './wizard/ProjectTypeStep';
import TechStackStep from './wizard/TechStackStep';
import WizardProgress from './wizard/WizardProgress';
import WizardNavigation from './wizard/WizardNavigation';

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
    generatedSpec: null,
    architecture: null,
    timeline: ''
  });

  const { createProject } = useProjects();
  const { toast } = useToast();

  const steps = [
    'Project Description',
    'AI Model Selection', 
    'Project Type',
    'Technical Requirements',
    'AI Analysis',
    'Final Review'
  ];

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
      await performAIAnalysis();
    } else if (currentStep === 6) {
      await createProjectWithAI();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const performAIAnalysis = async () => {
    setIsGenerating(true);
    try {
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
        status: 'draft',
        tech_stack: projectData.techStack,
        ai_model: projectData.aiModel,
        metadata: {
          ai_model: projectData.aiModel,
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
      resetWizard();
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

  const resetWizard = () => {
    setCurrentStep(1);
    setProjectData({
      name: '',
      description: '',
      aiModel: 'gpt-4' as AIModel,
      projectType: '',
      techStack: [],
      generatedSpec: null,
      architecture: null,
      timeline: ''
    });
  };

  const updateProjectData = (updates: any) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const toggleTechStack = (tech: string) => {
    setProjectData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectDescriptionStep
            projectData={projectData}
            onUpdate={updateProjectData}
          />
        );
      case 2:
        return (
          <AIModelSelectionStep
            selectedModel={projectData.aiModel}
            onSelect={(model) => updateProjectData({ aiModel: model })}
          />
        );
      case 3:
        return (
          <ProjectTypeStep
            projectType={projectData.projectType}
            onSelect={(type) => updateProjectData({ projectType: type })}
          />
        );
      case 4:
        return (
          <TechStackStep
            selectedTech={projectData.techStack}
            onToggle={toggleTechStack}
          />
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
              {projectData.timeline && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium">Timeline Estimate</div>
                  <div className="text-sm text-muted-foreground">{projectData.timeline}</div>
                </div>
              )}
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
          <WizardProgress
            currentStep={currentStep}
            totalSteps={steps.length}
            stepName={steps[currentStep - 1]}
          />

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            canProceed={canProceed()}
            isProcessing={isGenerating}
            onPrevious={() => setCurrentStep(prev => prev - 1)}
            onNext={handleNextStep}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProjectWizard;

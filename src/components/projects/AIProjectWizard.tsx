
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
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
      await createProjectWithAI();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const createProjectWithAI = async () => {
    setIsGenerating(true);
    try {
      console.log('Creating project with data:', projectData);
      
      await createProject({
        name: projectData.name,
        description: projectData.description,
        type: getProjectType(projectData.projectType),
        status: 'draft',
        tech_stack: projectData.techStack,
        ai_model: projectData.aiModel,
        metadata: {
          ai_model: projectData.aiModel,
          ai_generated: true,
          creation_date: new Date().toISOString(),
          wizard_completed: true
        }
      });

      toast({
        title: "Project Created Successfully",
        description: "Your AI-powered project has been created successfully",
      });

      onOpenChange(false);
      resetWizard();
    } catch (error) {
      console.error('Project creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create project. Please try again.",
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
          <div className="space-y-4">
            <h3 className="font-semibold">Project Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Project Name</div>
                <div className="text-sm text-muted-foreground">{projectData.name}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Project Type</div>
                <div className="text-sm text-muted-foreground">{projectData.projectType}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">AI Model</div>
                <div className="text-sm text-muted-foreground">{projectData.aiModel.toUpperCase()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Tech Stack</div>
                <div className="text-sm text-muted-foreground">
                  {projectData.techStack.length > 0 ? projectData.techStack.join(', ') : 'None selected'}
                </div>
              </div>
            </div>
            {isGenerating && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating your project...
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return Boolean(projectData.name && projectData.description);
      case 2: return Boolean(projectData.aiModel);
      case 3: return Boolean(projectData.projectType);
      case 4: return true; // Tech stack is optional
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

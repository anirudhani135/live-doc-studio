import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProjects } from '@/hooks/useProjects';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Project } from '@/types/project';
import WizardProgress from './wizard/WizardProgress';
import WizardNavigation from './wizard/WizardNavigation';
import ProjectDescriptionStep from './wizard/ProjectDescriptionStep';
import ProjectTypeStep from './wizard/ProjectTypeStep';
import TechStackStep from './wizard/TechStackStep';
import AIModelSelectionStep from './wizard/AIModelSelectionStep';

interface AIProjectWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WizardData {
  name: string;
  description: string;
  type: Project['type'] | '';
  techStack: string[];
  aiModel: Project['ai_model'] | '';
}

const AIProjectWizard: React.FC<AIProjectWizardProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { createProject } = useProjects();
  const { trackProjectCreated } = useAnalytics();

  const [wizardData, setWizardData] = useState<WizardData>({
    name: '',
    description: '',
    type: '',
    techStack: [],
    aiModel: ''
  });

  const totalSteps = 4;

  const stepNames = {
    1: 'Project Description',
    2: 'Project Type',
    3: 'Technology Stack',
    4: 'AI Model Selection'
  };

  const canGoNext = useCallback(() => {
    switch (currentStep) {
      case 1:
        return wizardData.name.trim() && wizardData.description.trim();
      case 2:
        return wizardData.type !== '';
      case 3:
        return true; // Tech stack is optional
      case 4:
        return wizardData.aiModel !== '';
      default:
        return false;
    }
  }, [currentStep, wizardData]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    if (!canGoNext()) return;

    try {
      setLoading(true);
      
      const projectData = {
        name: wizardData.name,
        description: wizardData.description,
        type: wizardData.type as Project['type'],
        status: 'draft' as const,
        tech_stack: wizardData.techStack,
        ai_model: wizardData.aiModel as Project['ai_model'],
        metadata: {
          wizard_completed: true,
          created_via: 'ai_wizard'
        }
      };

      const project = await createProject(projectData);
      
      if (project) {
        trackProjectCreated(projectData);
        onOpenChange(false);
        resetWizard();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setWizardData({
      name: '',
      description: '',
      type: '',
      techStack: [],
      aiModel: ''
    });
    setLoading(false);
  };

  const handleDialogOpenChange = (newOpen: boolean) => {
    if (!loading) {
      onOpenChange(newOpen);
      if (!newOpen) {
        resetWizard();
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectDescriptionStep
            data={{
              name: wizardData.name,
              description: wizardData.description
            }}
            onChange={(data) => setWizardData(prev => ({ ...prev, ...data }))}
          />
        );
      case 2:
        return (
          <ProjectTypeStep
            selectedType={wizardData.type}
            onTypeSelect={(type) => setWizardData(prev => ({ ...prev, type }))}
          />
        );
      case 3:
        return (
          <TechStackStep
            selectedStack={wizardData.techStack}
            onStackChange={(techStack) => setWizardData(prev => ({ ...prev, techStack }))}
          />
        );
      case 4:
        return (
          <AIModelSelectionStep
            selectedModel={wizardData.aiModel}
            onModelSelect={(aiModel) => setWizardData(prev => ({ ...prev, aiModel }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Project Wizard</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <WizardProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepName={stepNames[currentStep as keyof typeof stepNames]}
          />

          <div className="min-h-[400px]">
            {renderCurrentStep()}
          </div>

          <WizardNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            canGoNext={canGoNext()}
            canGoBack={currentStep > 1}
            onNext={handleNext}
            onBack={handleBack}
            onComplete={handleComplete}
            loading={loading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProjectWizard;

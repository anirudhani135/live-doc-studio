
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isProcessing: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  isProcessing,
  onPrevious,
  onNext
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || isProcessing}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!canProceed || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : isLastStep ? (
          <CheckCircle className="h-4 w-4 mr-2" />
        ) : (
          <ArrowRight className="h-4 w-4 mr-2" />
        )}
        {isLastStep ? 'Complete' : 'Next'}
      </Button>
    </div>
  );
};

export default WizardNavigation;

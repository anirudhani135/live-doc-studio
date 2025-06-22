
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoBack: boolean;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  loading?: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  onComplete,
  loading = false
}) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={!canGoBack || loading}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>

      {isLastStep ? (
        <Button
          onClick={onComplete}
          disabled={!canGoNext || loading}
          className="gap-2"
        >
          {loading ? 'Creating...' : 'Create Project'}
          {!loading && <ChevronRight className="h-4 w-4" />}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoNext || loading}
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default WizardNavigation;

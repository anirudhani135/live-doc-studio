
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  totalSteps,
  stepName
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Step {currentStep} of {totalSteps}</h4>
          <p className="text-sm text-muted-foreground">{stepName}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {currentStep > 1 && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              {currentStep - 1} completed
            </>
          )}
        </div>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>{Math.round(progress)}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WizardProgress;

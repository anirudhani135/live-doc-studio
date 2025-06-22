
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

type AIModel = 'gpt-4' | 'claude' | 'gemini';

interface AIModelSelectionStepProps {
  selectedModel: AIModel;
  onSelect: (model: AIModel) => void;
}

const AIModelSelectionStep: React.FC<AIModelSelectionStepProps> = ({
  selectedModel,
  onSelect
}) => {
  const models: { id: AIModel; name: string; description: string }[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Best for comprehensive analysis and coding'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Excellent for detailed documentation'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Great for creative and technical solutions'
    }
  ];

  return (
    <div className="space-y-4">
      <Label>Select AI Model</Label>
      <div className="grid gap-3">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-colors ${
              selectedModel === model.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => onSelect(model.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{model.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {model.description}
                  </p>
                </div>
                {selectedModel === model.id && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIModelSelectionStep;

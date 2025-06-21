
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface AIModelSelectionStepProps {
  selectedModel: 'gpt-4' | 'claude' | 'gemini';
  onSelect: (model: 'gpt-4' | 'claude' | 'gemini') => void;
}

const AIModelSelectionStep: React.FC<AIModelSelectionStepProps> = ({
  selectedModel,
  onSelect
}) => {
  const models = [
    {
      id: 'gpt-4' as const,
      name: 'GPT-4',
      description: 'Advanced reasoning and code generation',
      features: ['Excellent code quality', 'Strong reasoning', 'Versatile'],
      recommended: true
    },
    {
      id: 'claude' as const,
      name: 'Claude',
      description: 'Thoughtful analysis and documentation',
      features: ['Great for docs', 'Detailed analysis', 'Safety focused'],
      recommended: false
    },
    {
      id: 'gemini' as const,
      name: 'Gemini',
      description: 'Fast and efficient processing',
      features: ['Quick responses', 'Good performance', 'Cost effective'],
      recommended: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose AI Model</h3>
        <p className="text-muted-foreground mb-6">
          Select the AI model that will help generate your project specifications and documentation.
        </p>
      </div>

      <div className="grid gap-4">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-all ${
              selectedModel === model.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelect(model.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{model.name}</CardTitle>
                  {model.recommended && (
                    <Badge variant="default" className="text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
                {selectedModel === model.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{model.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {model.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIModelSelectionStep;

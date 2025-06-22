
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Shield } from 'lucide-react';

interface AIModelSelectionStepProps {
  selectedModel: 'gpt-4' | 'claude' | 'gemini' | '';
  onModelSelect: (model: 'gpt-4' | 'claude' | 'gemini') => void;
}

const aiModels = [
  {
    id: 'gpt-4' as const,
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most versatile model for code generation and documentation',
    icon: Brain,
    features: ['Code Generation', 'Documentation', 'Architecture Design', 'Debugging'],
    performance: 'High',
    recommended: true
  },
  {
    id: 'claude' as const,
    name: 'Claude',
    provider: 'Anthropic',
    description: 'Excellent for detailed analysis and safe code practices',
    icon: Shield,
    features: ['Code Analysis', 'Security Review', 'Documentation', 'Refactoring'],
    performance: 'High',
    recommended: false
  },
  {
    id: 'gemini' as const,
    name: 'Gemini',
    provider: 'Google',
    description: 'Fast and efficient for rapid prototyping',
    icon: Zap,
    features: ['Rapid Prototyping', 'Code Completion', 'Quick Fixes', 'Optimization'],
    performance: 'Very High',
    recommended: false
  }
];

const AIModelSelectionStep: React.FC<AIModelSelectionStepProps> = ({ selectedModel, onModelSelect }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">AI Model Selection</h3>
        <p className="text-muted-foreground">
          Choose the AI model that will assist you throughout your project development.
        </p>
      </div>

      <div className="grid gap-4">
        {aiModels.map((model) => {
          const Icon = model.icon;
          const isSelected = selectedModel === model.id;
          
          return (
            <Card
              key={model.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => onModelSelect(model.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{model.name}</h4>
                      <Badge variant="outline">{model.provider}</Badge>
                      {model.recommended && <Badge variant="default">Recommended</Badge>}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{model.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Performance: </span>
                        <span className="font-medium">{model.performance}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AIModelSelectionStep;

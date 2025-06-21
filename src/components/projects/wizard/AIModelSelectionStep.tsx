
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type AIModel = 'gpt-4' | 'claude' | 'gemini';

interface ModelFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AIModelSelectionStepProps {
  selectedModel: AIModel;
  onSelect: (model: AIModel) => void;
}

const AIModelSelectionStep: React.FC<AIModelSelectionStepProps> = ({
  selectedModel,
  onSelect
}) => {
  const models: { 
    id: AIModel; 
    name: string; 
    description: string;
    badge: string;
    color: string;
    features: ModelFeature[];
    recommended?: boolean;
  }[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most versatile AI model with excellent coding and analysis capabilities',
      badge: 'Most Popular',
      color: 'border-emerald-200 bg-emerald-50/50',
      recommended: true,
      features: [
        {
          icon: <Brain className="h-4 w-4 text-emerald-600" />,
          title: 'Advanced Reasoning',
          description: 'Superior logical thinking and problem-solving'
        },
        {
          icon: <Zap className="h-4 w-4 text-emerald-600" />,
          title: 'Code Generation',
          description: 'Excellent at writing and debugging code'
        },
        {
          icon: <Sparkles className="h-4 w-4 text-emerald-600" />,
          title: 'Documentation',
          description: 'Creates comprehensive technical docs'
        }
      ]
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Excels at detailed analysis and thoughtful documentation creation',
      badge: 'Best for Docs',
      color: 'border-blue-200 bg-blue-50/50',
      features: [
        {
          icon: <Brain className="h-4 w-4 text-blue-600" />,
          title: 'Deep Analysis',
          description: 'Thorough understanding of complex topics'
        },
        {
          icon: <Sparkles className="h-4 w-4 text-blue-600" />,
          title: 'Writing Quality',
          description: 'Exceptional at creating clear documentation'
        },
        {
          icon: <Zap className="h-4 w-4 text-blue-600" />,
          title: 'Structured Output',
          description: 'Well-organized and detailed responses'
        }
      ]
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Creative and innovative AI perfect for unique solutions and ideas',
      badge: 'Most Creative',
      color: 'border-purple-200 bg-purple-50/50',
      features: [
        {
          icon: <Sparkles className="h-4 w-4 text-purple-600" />,
          title: 'Creative Solutions',
          description: 'Innovative approaches to problems'
        },
        {
          icon: <Zap className="h-4 w-4 text-purple-600" />,
          title: 'Multi-modal',
          description: 'Handles various types of content well'
        },
        {
          icon: <Brain className="h-4 w-4 text-purple-600" />,
          title: 'Adaptable',
          description: 'Flexible thinking and problem solving'
        }
      ]
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label className="text-sm font-medium">Choose Your AI Assistant</Label>
        <p className="text-sm text-muted-foreground">
          Select the AI model that best fits your project needs
        </p>
      </div>

      <div className="grid gap-4">
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedModel === model.id 
                  ? `border-primary bg-primary/5 shadow-md ${model.color}` 
                  : 'hover:border-primary/50'
              } ${model.recommended ? 'ring-2 ring-primary/20' : ''}`}
              onClick={() => onSelect(model.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{model.name}</h3>
                        {model.recommended && (
                          <Badge variant="default" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {model.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {model.description}
                      </p>
                    </div>
                    
                    {selectedModel === model.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {model.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start gap-2 p-2 rounded-lg bg-background/50"
                      >
                        {feature.icon}
                        <div className="space-y-1">
                          <div className="text-xs font-medium">{feature.title}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIModelSelectionStep;

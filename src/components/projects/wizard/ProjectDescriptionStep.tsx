
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ProjectDescriptionStepProps {
  projectData: {
    name: string;
    description: string;
  };
  onUpdate: (updates: any) => void;
}

const ProjectDescriptionStep: React.FC<ProjectDescriptionStepProps> = ({
  projectData,
  onUpdate
}) => {
  const suggestionChips = [
    'Web Application',
    'Mobile App',
    'API Service',
    'Dashboard',
    'E-commerce',
    'Blog Platform'
  ];

  const handleSuggestionClick = (suggestion: string) => {
    const currentDesc = projectData.description;
    const newDesc = currentDesc ? `${currentDesc} ${suggestion}` : suggestion;
    onUpdate({ description: newDesc });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Describe Your Project</h3>
        <p className="text-muted-foreground mb-6">
          Tell us about your project idea. The more details you provide, the better our AI can help you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={projectData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Enter your project name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Project Description</Label>
          <Textarea
            id="project-description"
            value={projectData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe what you want to build, its purpose, target audience, and key features..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Quick Suggestions</Label>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescriptionStep;

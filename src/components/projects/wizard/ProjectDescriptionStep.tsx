
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProjectDescriptionStepProps {
  projectData: {
    name: string;
    description: string;
  };
  onUpdate: (data: Partial<{ name: string; description: string }>) => void;
}

const ProjectDescriptionStep: React.FC<ProjectDescriptionStepProps> = ({
  projectData,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={projectData.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Enter your project name"
        />
      </div>
      <div>
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          id="projectDescription"
          value={projectData.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your project goals, target audience, and key features..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default ProjectDescriptionStep;

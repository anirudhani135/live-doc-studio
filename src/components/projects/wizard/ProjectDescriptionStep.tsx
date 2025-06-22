
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface ProjectDescriptionStepProps {
  data: {
    name: string;
    description: string;
  };
  onChange: (data: { name: string; description: string }) => void;
}

const ProjectDescriptionStep: React.FC<ProjectDescriptionStepProps> = ({ data, onChange }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...data, description: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Project Details</h3>
        <p className="text-muted-foreground">
          Provide basic information about your project to help our AI understand your needs.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name *</Label>
          <Input
            id="project-name"
            value={data.name}
            onChange={handleNameChange}
            placeholder="Enter your project name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Project Description *</Label>
          <Textarea
            id="project-description"
            value={data.description}
            onChange={handleDescriptionChange}
            placeholder="Describe what you want to build, key features, and target audience..."
            rows={6}
            required
          />
          <p className="text-xs text-muted-foreground">
            The more detailed your description, the better our AI can assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescriptionStep;


import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectTypeStepProps {
  projectType: string;
  onSelect: (type: string) => void;
}

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({
  projectType,
  onSelect
}) => {
  const projectTypes = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'api', label: 'API/Backend Service' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'cms', label: 'Content Management' },
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-4">
      <Label>Project Type</Label>
      <Select value={projectType} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select project type" />
        </SelectTrigger>
        <SelectContent>
          {projectTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectTypeStep;


import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface TechStackStepProps {
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

const TechStackStep: React.FC<TechStackStepProps> = ({
  selectedTech,
  onToggle
}) => {
  const technologies = [
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
    'Supabase', 'Tailwind CSS', 'Python', 'Docker',
    'AWS', 'Firebase', 'MongoDB', 'Redis'
  ];

  return (
    <div className="space-y-4">
      <Label>Technology Stack (Select multiple)</Label>
      <div className="grid grid-cols-2 gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant={selectedTech.includes(tech) ? 'default' : 'outline'}
            className="cursor-pointer justify-center p-2"
            onClick={() => onToggle(tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TechStackStep;

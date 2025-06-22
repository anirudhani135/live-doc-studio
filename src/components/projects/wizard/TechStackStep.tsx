
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface TechStackStepProps {
  selectedStack: string[];
  onStackChange: (stack: string[]) => void;
}

const popularTechnologies = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'Next.js',
  'Vue.js', 'Angular', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB',
  'MySQL', 'Redis', 'Docker', 'AWS', 'Firebase', 'Supabase',
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI'
];

const TechStackStep: React.FC<TechStackStepProps> = ({ selectedStack, onStackChange }) => {
  const [customTech, setCustomTech] = useState('');

  const addTechnology = (tech: string) => {
    if (tech && !selectedStack.includes(tech)) {
      onStackChange([...selectedStack, tech]);
    }
  };

  const removeTechnology = (tech: string) => {
    onStackChange(selectedStack.filter(t => t !== tech));
  };

  const handleAddCustom = () => {
    if (customTech.trim()) {
      addTechnology(customTech.trim());
      setCustomTech('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustom();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Technology Stack</h3>
        <p className="text-muted-foreground">
          Select the technologies you want to use or plan to integrate in your project.
        </p>
      </div>

      {selectedStack.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Technologies</Label>
          <div className="flex flex-wrap gap-2">
            {selectedStack.map((tech) => (
              <Badge key={tech} variant="default" className="gap-1">
                {tech}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive/20"
                  onClick={() => removeTechnology(tech)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Add Custom Technology</Label>
          <div className="flex gap-2">
            <Input
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter technology name"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddCustom}
              disabled={!customTech.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Popular Technologies</Label>
          <div className="flex flex-wrap gap-2">
            {popularTechnologies.map((tech) => {
              const isSelected = selectedStack.includes(tech);
              return (
                <Badge
                  key={tech}
                  variant={isSelected ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? '' : 'hover:bg-primary hover:text-primary-foreground'
                  }`}
                  onClick={() => isSelected ? removeTechnology(tech) : addTechnology(tech)}
                >
                  {tech}
                  {isSelected && <X className="h-3 w-3 ml-1" />}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackStep;

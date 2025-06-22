
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface TechStackStepProps {
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

const TechStackStep: React.FC<TechStackStepProps> = ({
  selectedTech,
  onToggle
}) => {
  const techCategories = [
    {
      name: 'Frontend',
      technologies: [
        { id: 'react', name: 'React', description: 'Popular UI library' },
        { id: 'vue', name: 'Vue.js', description: 'Progressive framework' },
        { id: 'angular', name: 'Angular', description: 'Full framework' },
        { id: 'svelte', name: 'Svelte', description: 'Compile-time framework' }
      ]
    },
    {
      name: 'Backend',
      technologies: [
        { id: 'nodejs', name: 'Node.js', description: 'JavaScript runtime' },
        { id: 'python', name: 'Python', description: 'Django/Flask' },
        { id: 'java', name: 'Java', description: 'Spring Boot' },
        { id: 'dotnet', name: '.NET', description: 'Microsoft stack' }
      ]
    },
    {
      name: 'Database',
      technologies: [
        { id: 'postgresql', name: 'PostgreSQL', description: 'Relational DB' },
        { id: 'mongodb', name: 'MongoDB', description: 'Document DB' },
        { id: 'mysql', name: 'MySQL', description: 'Popular SQL DB' },
        { id: 'redis', name: 'Redis', description: 'In-memory store' }
      ]
    },
    {
      name: 'Cloud & DevOps',
      technologies: [
        { id: 'aws', name: 'AWS', description: 'Amazon cloud' },
        { id: 'docker', name: 'Docker', description: 'Containerization' },
        { id: 'kubernetes', name: 'Kubernetes', description: 'Orchestration' },
        { id: 'vercel', name: 'Vercel', description: 'Deployment platform' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Technology Stack</h3>
        <p className="text-muted-foreground mb-6">
          Choose the technologies you want to use. Don't worry, you can change these later.
        </p>
      </div>

      <div className="space-y-6">
        {techCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {category.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTech.includes(tech.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => onToggle(tech.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {tech.description}
                        </div>
                      </div>
                      {selectedTech.includes(tech.id) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <div className="text-sm font-medium mb-2">Selected Technologies:</div>
        <div className="flex flex-wrap gap-1">
          {selectedTech.length > 0 ? (
            selectedTech.map((tech) => (
              <Badge key={tech} variant="default" className="text-xs">
                {tech}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">None selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStackStep;

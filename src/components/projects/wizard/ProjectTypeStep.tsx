
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, FileText, Database } from 'lucide-react';

interface ProjectTypeStepProps {
  selectedType: 'code_project' | 'documentation' | 'api_spec' | '';
  onTypeSelect: (type: 'code_project' | 'documentation' | 'api_spec') => void;
}

const projectTypes = [
  {
    id: 'code_project' as const,
    title: 'Code Project',
    description: 'Full-stack application with frontend and backend components',
    icon: Code,
    features: ['Component Architecture', 'API Integration', 'Database Design', 'Authentication'],
    popular: true
  },
  {
    id: 'documentation' as const,
    title: 'Documentation',
    description: 'Technical documentation, user guides, and project specs',
    icon: FileText,
    features: ['Technical Specs', 'User Guides', 'API Docs', 'Architecture Docs'],
    popular: false
  },
  {
    id: 'api_spec' as const,
    title: 'API Specification',
    description: 'RESTful API design and documentation',
    icon: Database,
    features: ['OpenAPI Spec', 'Endpoint Design', 'Schema Definition', 'Testing Guides'],
    popular: false
  }
];

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Project Type</h3>
        <p className="text-muted-foreground">
          Choose the type of project you want to create. This helps our AI provide more targeted assistance.
        </p>
      </div>

      <div className="grid gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{type.title}</h4>
                      {type.popular && <Badge variant="secondary">Popular</Badge>}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{type.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {type.features.map((feature) => (
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

export default ProjectTypeStep;

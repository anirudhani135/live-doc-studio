
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ProjectTypeStepProps {
  projectType: string;
  onSelect: (type: string) => void;
}

const ProjectTypeStep: React.FC<ProjectTypeStepProps> = ({
  projectType,
  onSelect
}) => {
  const projectTypes = [
    {
      id: 'web-app',
      name: 'Web Application',
      description: 'Interactive web applications with modern frameworks',
      examples: ['React SPA', 'Vue.js app', 'Angular application']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'Mobile-first applications and progressive web apps',
      examples: ['React Native', 'Progressive Web App', 'Mobile-responsive']
    },
    {
      id: 'api',
      name: 'API Service',
      description: 'RESTful APIs and microservices',
      examples: ['REST API', 'GraphQL', 'Microservice']
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      description: 'Software as a Service platforms with subscriptions',
      examples: ['Dashboard', 'Multi-tenant', 'Subscription model']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Online stores and marketplace platforms',
      examples: ['Online store', 'Marketplace', 'Shopping cart']
    },
    {
      id: 'cms',
      name: 'Content Management',
      description: 'Content management systems and blogs',
      examples: ['Blog platform', 'CMS', 'Content portal']
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Data visualization and reporting tools',
      examples: ['Business intelligence', 'Reporting', 'Data visualization']
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Custom or specialized applications',
      examples: ['Custom solution', 'Specialized tool', 'Unique requirements']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Type</h3>
        <p className="text-muted-foreground mb-6">
          What type of project are you building? This helps us recommend the right technologies and architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all ${
              projectType === type.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelect(type.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{type.name}</CardTitle>
                {projectType === type.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Examples: </span>
                {type.examples.join(', ')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeStep;

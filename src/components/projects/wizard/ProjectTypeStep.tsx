
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      description: 'Full-stack web application with frontend and backend',
      features: ['Responsive design', 'User authentication', 'Database integration']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'Cross-platform mobile app for iOS and Android',
      features: ['Native performance', 'Offline support', 'Push notifications']
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      description: 'Software as a Service platform with subscription model',
      features: ['Multi-tenancy', 'Billing integration', 'Analytics dashboard']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Online store with payment processing and inventory',
      features: ['Payment gateway', 'Inventory management', 'Order tracking']
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Data visualization and reporting platform',
      features: ['Real-time charts', 'Custom reports', 'Data export']
    },
    {
      id: 'api',
      name: 'API Service',
      description: 'RESTful API or GraphQL service',
      features: ['API documentation', 'Rate limiting', 'Monitoring']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Project Type</h3>
        <p className="text-muted-foreground mb-6">
          Choose the type of project you want to build. This helps our AI provide better recommendations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
              <div className="flex flex-wrap gap-1">
                {type.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeStep;

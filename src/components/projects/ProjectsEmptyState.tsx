
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus } from 'lucide-react';

interface ProjectsEmptyStateProps {
  onStartWizard: () => void;
  onCreateProject: () => void;
}

const ProjectsEmptyState: React.FC<ProjectsEmptyStateProps> = ({
  onStartWizard,
  onCreateProject
}) => {
  return (
    <div className="text-center py-12">
      <Sparkles className="h-16 w-16 text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Create your first AI-powered project to get started with intelligent documentation and collaboration
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={onStartWizard} className="bg-blue-600 hover:bg-blue-700">
          <Sparkles className="h-4 w-4 mr-2" />
          Start AI Wizard
        </Button>
        <Button variant="outline" onClick={onCreateProject}>
          <Plus className="h-4 w-4 mr-2" />
          Quick Create
        </Button>
      </div>
    </div>
  );
};

export default ProjectsEmptyState;

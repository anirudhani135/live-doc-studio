
// Make empty state padding, icons, and buttons responsive

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
    <div className="flex flex-col items-center justify-center py-10 px-2 sm:px-12">
      <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
        Create your first AI-powered project to get started with intelligent documentation and collaboration
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button onClick={onStartWizard} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Sparkles className="h-4 w-4 mr-2" />
          Start AI Wizard
        </Button>
        <Button variant="outline" onClick={onCreateProject} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Quick Create
        </Button>
      </div>
    </div>
  );
};

export default ProjectsEmptyState;

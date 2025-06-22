
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sparkles } from 'lucide-react';

interface ProjectsHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  projectCount: number;
  onCreateProject: () => void;
  onStartWizard: () => void;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = memo(({
  activeTab,
  onTabChange,
  projectCount,
  onCreateProject,
  onStartWizard
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="w-full md:w-auto">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Projects ({projectCount})</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Button variant="outline" size="sm" onClick={onStartWizard} className="w-full sm:w-auto">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Project Wizard
        </Button>
        <Button size="sm" onClick={onCreateProject} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>
    </div>
  );
});

ProjectsHeader.displayName = 'ProjectsHeader';

export default ProjectsHeader;

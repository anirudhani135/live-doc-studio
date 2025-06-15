
// Make header and tab/buttons responsive, stack on mobile

import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, Plus, Sparkles } from 'lucide-react';

interface ProjectsHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  projectCount: number;
  onCreateProject: () => void;
  onStartWizard: () => void;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
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
            <TabsTrigger value="projects" className="flex items-center gap-2 w-full md:w-auto">
              <Grid className="h-4 w-4" />
              My Projects ({projectCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Button variant="outline" onClick={onCreateProject} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Quick Create
        </Button>
        <Button onClick={onStartWizard} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Project Wizard
        </Button>
      </div>
    </div>
  );
};

export default ProjectsHeader;

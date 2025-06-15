
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
    <div className="flex items-center justify-between mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            My Projects ({projectCount})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCreateProject}>
          <Plus className="h-4 w-4 mr-2" />
          Quick Create
        </Button>
        <Button onClick={onStartWizard} className="bg-blue-600 hover:bg-blue-700">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Project Wizard
        </Button>
      </div>
    </div>
  );
};

export default ProjectsHeader;

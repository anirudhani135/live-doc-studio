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
  return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="w-full md:w-auto">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="w-full md:w-auto">
            
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        
        
      </div>
    </div>;
};
export default ProjectsHeader;
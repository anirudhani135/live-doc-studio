
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, Grid } from 'lucide-react';

interface ProjectsBannerProps {
  onStartWizard: () => void;
}

const ProjectsBanner: React.FC<ProjectsBannerProps> = ({ onStartWizard }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Create Your Next Project with AI</h2>
          <p className="mb-4 opacity-90">
            Let our AI guide you through a comprehensive 9-step project creation process
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Auto Documentation
            </div>
            <div className="flex items-center gap-1">
              <Grid className="h-4 w-4" />
              Project Monitoring
            </div>
          </div>
        </div>
        <Button 
          onClick={onStartWizard}
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Start AI Wizard
        </Button>
      </div>
    </div>
  );
};

export default ProjectsBanner;

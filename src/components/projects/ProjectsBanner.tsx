
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, Users, Zap } from 'lucide-react';

interface ProjectsBannerProps {
  onStartWizard: () => void;
}

const ProjectsBanner: React.FC<ProjectsBannerProps> = ({
  onStartWizard
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Create Your Next Project with AI</h2>
          <p className="mb-4 opacity-90 text-sm sm:text-base">
            Let our AI guide you through a comprehensive 9-step project creation process
          </p>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Auto Documentation
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Team Collaboration
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Smart Integrations
            </div>
          </div>
        </div>
        <Button 
          onClick={onStartWizard} 
          className="bg-white text-blue-600 hover:bg-gray-100 mt-4 md:mt-0 w-full md:w-auto"
        >
          Start 9-Step AI Wizard
        </Button>
      </div>
    </div>
  );
};

export default ProjectsBanner;

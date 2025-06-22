
// Ensure grid is responsive, reflows at standard breakpoints

import React from 'react';
import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onOpen: (project: Project) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  loading,
  onEdit,
  onDelete,
  onOpen
}) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-40 sm:h-48 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Projects grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;

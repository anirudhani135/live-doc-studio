
import React, { memo } from 'react';
import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onOpen: (project: Project) => void;
}

/**
 * Skeleton loader component for project cards
 */
const ProjectCardSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="h-40 sm:h-48 bg-gray-200 rounded-lg" />
  </div>
));

/**
 * Grid layout for displaying projects with responsive design
 * Optimized with memoization to prevent unnecessary re-renders
 */
const ProjectsGrid: React.FC<ProjectsGridProps> = memo(({
  projects,
  loading,
  onEdit,
  onDelete,
  onOpen
}) => {
  // Render loading skeleton with consistent grid layout
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Render projects grid with consistent responsive layout
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
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;

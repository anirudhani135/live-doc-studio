
import React, { memo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';
import { FileText, Code, Settings, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onOpen: (project: Project) => void;
}

/**
 * Get the appropriate icon for project type
 */
const getTypeIcon = (type: Project['type']) => {
  const iconMap = {
    code_project: <Code className="h-4 w-4" />,
    documentation: <FileText className="h-4 w-4" />,
    api_spec: <Settings className="h-4 w-4" />,
  };
  return iconMap[type] || <FileText className="h-4 w-4" />;
};

/**
 * Get badge variant based on project status
 */
const getStatusVariant = (status: Project['status']) => {
  const variantMap = {
    draft: 'secondary' as const,
    in_progress: 'default' as const,
    completed: 'default' as const,
    archived: 'secondary' as const,
  };
  return variantMap[status] || 'secondary';
};

/**
 * Optimized project card component with memoization
 * Displays project information with responsive design
 */
const ProjectCard: React.FC<ProjectCardProps> = memo(({ 
  project, 
  onEdit, 
  onDelete, 
  onOpen 
}) => {
  // Memoize event handlers to prevent unnecessary re-renders
  const handleEdit = useCallback(() => {
    onEdit(project);
  }, [onEdit, project]);

  const handleDelete = useCallback(() => {
    onDelete(project.id);
  }, [onDelete, project.id]);

  const handleOpen = useCallback(() => {
    onOpen(project);
  }, [onOpen, project]);

  // Memoize computed values
  const typeIcon = getTypeIcon(project.type);
  const statusVariant = getStatusVariant(project.status);
  const formattedDate = formatDistanceToNow(new Date(project.updated_at));
  const displayedTechStack = project.tech_stack?.slice(0, 3) || [];
  const additionalTechCount = (project.tech_stack?.length || 0) - 3;

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
      <CardHeader className="pb-3">
        {/* Header with project type icon, name, and status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {typeIcon}
            <CardTitle className="text-base sm:text-lg">{project.name}</CardTitle>
          </div>
          <Badge variant={statusVariant} className="text-xs">
            {project.status.replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
        {/* Technology stack badges */}
        <div className="flex flex-wrap gap-1">
          {displayedTechStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {additionalTechCount > 0 && (
            <Badge variant="outline" className="text-xs">
              +{additionalTechCount} more
            </Badge>
          )}
        </div>
        
        {/* AI model and last updated info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-1">
          <span>AI Model: {project.ai_model.toUpperCase()}</span>
          <span>{formattedDate} ago</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleOpen}
            className="flex-1"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Open
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEdit}
            className="flex-1 sm:flex-none"
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 flex-1 sm:flex-none"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

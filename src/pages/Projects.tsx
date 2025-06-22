
import React, { useState, useCallback, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/contexts/AuthContext';
import { Project } from '@/types/project';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectsBanner from '@/components/projects/ProjectsBanner';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsEmptyState from '@/components/projects/ProjectsEmptyState';
import ProjectDialog from '@/components/projects/ProjectDialog';
import ProjectCreationWizard from '@/components/projects/ProjectCreationWizard';

/**
 * Main Projects page component with optimized performance
 * Uses memoization and optimized re-rendering patterns
 */
const Projects = () => {
  const { user, loading: authLoading } = useAuth();
  const { projects, createProject, updateProject, deleteProject, loading, error } = useProjects();
  const { trackProjectCreated, trackFeatureUsed } = useAnalytics();
  
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  console.log('Projects page state:', { 
    user: !!user, 
    authLoading, 
    projectsLoading: loading, 
    projectsCount: projects?.length || 0,
    error 
  });

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    if (loading || !Array.isArray(projects)) return [];
    
    return projects.filter(project => {
      switch (activeTab) {
        case 'recent': {
          const recentDate = new Date();
          recentDate.setDate(recentDate.getDate() - 7);
          return new Date(project.created_at) > recentDate;
        }
        case 'favorites':
          return project.metadata?.favorited;
        default:
          return true;
      }
    });
  }, [projects, activeTab, loading]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleCreateProject = useCallback(() => {
    if (!user) {
      console.log('Projects - Cannot create project: no user');
      return;
    }
    trackFeatureUsed('manual_project_creation');
    setDialogOpen(true);
  }, [trackFeatureUsed, user]);

  const handleStartWizard = useCallback(() => {
    if (!user) {
      console.log('Projects - Cannot start wizard: no user');
      return;
    }
    trackFeatureUsed('ai_project_wizard');
    setWizardOpen(true);
  }, [trackFeatureUsed, user]);

  const handleProjectSave = useCallback(async (projectData: any) => {
    try {
      console.log('Projects - Saving project:', projectData);
      await createProject(projectData);
      trackProjectCreated(projectData);
      setDialogOpen(false);
    } catch (error) {
      console.error('Projects - Error creating project:', error);
    }
  }, [createProject, trackProjectCreated]);

  const handleWizardComplete = useCallback(async (projectData: any) => {
    try {
      console.log('Projects - Completing wizard with data:', projectData);
      
      // Transform wizard data to project format
      const transformedProjectData = {
        name: projectData.description.split('.')[0] || 'AI Generated Project',
        description: projectData.description,
        type: 'code_project' as const,
        status: 'draft' as const,
        tech_stack: projectData.analysis?.tech_recommendations || [],
        ai_model: projectData.selectedModel as Project['ai_model'],
        metadata: {
          wizard_completed: true,
          created_via: '9_step_wizard',
          questionnaire: projectData.questionnaire,
          analysis: projectData.analysis,
          documentation: projectData.documentation,
          integrations: projectData.integrations,
          export_settings: projectData.exportSettings,
          monitoring_config: projectData.monitoringConfig,
          ai_generated: true
        }
      };

      await createProject(transformedProjectData);
      trackProjectCreated(transformedProjectData);
      setWizardOpen(false);
    } catch (error) {
      console.error('Projects - Error completing wizard:', error);
    }
  }, [createProject, trackProjectCreated]);

  const handleWizardCancel = useCallback(() => {
    setWizardOpen(false);
  }, []);

  const handleEditProject = useCallback((project: Project) => {
    console.log('Edit project:', project);
    // TODO: Implement edit functionality
  }, []);

  const handleDeleteProject = useCallback(async (id: string) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }, [deleteProject]);

  const handleOpenProject = useCallback((project: Project) => {
    console.log('Open project:', project);
    // TODO: Implement project opening functionality
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Show loading spinner during auth loading or initial projects load
  if (authLoading || (loading && !projects.length)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {authLoading ? 'Checking authentication...' : 'Loading projects...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error and no projects
  if (error && !projects.length) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-destructive text-lg font-medium mb-2">
              Failed to load projects
            </div>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show auth required state if no user
  if (!user) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg font-medium mb-2">
              Authentication Required
            </div>
            <p className="text-muted-foreground mb-4">
              Please log in to view your projects.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Projects header with tabs and actions */}
      <ProjectsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        projectCount={projects?.length || 0}
        onCreateProject={handleCreateProject}
        onStartWizard={handleStartWizard}
      />

      {/* Banner for AI wizard promotion (only show when projects exist) */}
      {projects?.length > 0 && (
        <div className="mb-6">
          <ProjectsBanner onStartWizard={handleStartWizard} />
        </div>
      )}

      {/* Main content area - projects grid or empty state */}
      {filteredProjects.length > 0 ? (
        <ProjectsGrid 
          projects={filteredProjects}
          loading={loading}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          onOpen={handleOpenProject}
        />
      ) : (
        <ProjectsEmptyState 
          onStartWizard={handleStartWizard}
          onCreateProject={handleCreateProject}
        />
      )}

      {/* Modal dialogs */}
      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleProjectSave}
      />

      {/* 9-Step Project Creation Wizard */}
      {wizardOpen && (
        <ProjectCreationWizard
          onComplete={handleWizardComplete}
          onCancel={handleWizardCancel}
        />
      )}
    </div>
  );
};

export default Projects;

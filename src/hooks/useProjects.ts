
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Memoize the fetch function with stable dependencies
  const fetchProjects = useCallback(async () => {
    // Don't fetch if auth is still loading or no user
    if (authLoading || !user) {
      setProjects([]);
      setLoading(false);
      setError(null);
      return;
    }

    console.log('useProjects - Starting fetch for user:', user.id);
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) {
        console.error('useProjects - Fetch error:', fetchError);
        throw fetchError;
      }
      
      console.log('useProjects - Fetch successful, projects:', data?.length || 0);
      
      const validProjects = (data || []).map(project => ({
        ...project,
        tech_stack: project.tech_stack || [],
        metadata: project.metadata || {}
      })) as Project[];
      
      setProjects(validProjects);
    } catch (error) {
      console.error('useProjects - Error fetching projects:', error);
      setError('Failed to fetch projects');
      setProjects([]);
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, authLoading, toast]); // Only depend on user.id, not the entire user object

  const createProject = useCallback(async (
    projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) {
      console.log('useProjects - Cannot create project: no user');
      toast({
        title: "Error",
        description: "You must be logged in to create a project.",
        variant: "destructive",
      });
      return null;
    }

    try {
      setLoading(true);
      
      console.log('useProjects - Creating project:', projectData);
      
      const insertData = {
        name: projectData.name,
        description: projectData.description,
        type: projectData.type,
        status: projectData.status || 'draft',
        tech_stack: projectData.tech_stack || [],
        ai_model: projectData.ai_model || 'gpt-4',
        metadata: projectData.metadata || {},
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('useProjects - Create error:', error);
        throw error;
      }

      console.log('useProjects - Project created successfully:', data);

      const newProject = {
        ...data,
        tech_stack: data.tech_stack || [],
        metadata: data.metadata || {}
      } as Project;
      
      setProjects(prev => [newProject, ...prev]);

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      return newProject;
    } catch (error) {
      console.error('useProjects - Error creating project:', error);
      setError('Failed to create project');
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id, toast]);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    if (!user) return null;

    try {
      console.log('useProjects - Updating project:', id, updates);
      
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
      ));

      const { data, error } = await supabase
        .from('projects')
        .update({
          name: updates.name,
          description: updates.description,
          type: updates.type,
          status: updates.status,
          tech_stack: updates.tech_stack,
          ai_model: updates.ai_model,
          metadata: updates.metadata
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => prev.map(p => 
        p.id === id ? { ...data, tech_stack: data.tech_stack || [], metadata: data.metadata || {} } as Project : p
      ));
      
      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      return data as Project;
    } catch (error) {
      console.error('useProjects - Error updating project:', error);
      await fetchProjects();
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }, [user?.id, fetchProjects, toast]);

  const deleteProject = useCallback(async (id: string) => {
    if (!user) return;

    try {
      console.log('useProjects - Deleting project:', id);
      
      const originalProjects = projects;
      setProjects(prev => prev.filter(p => p.id !== id));

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        setProjects(originalProjects);
        throw error;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error('useProjects - Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  }, [user?.id, projects, toast]);

  // Effect to fetch projects when user changes
  useEffect(() => {
    console.log('useProjects - Effect triggered:', { user: !!user, authLoading });
    fetchProjects();
  }, [fetchProjects]);

  const memoizedReturn = useMemo(() => ({
    projects,
    loading: loading || authLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  }), [projects, loading, authLoading, error, createProject, updateProject, deleteProject, fetchProjects]);

  return memoizedReturn;
};

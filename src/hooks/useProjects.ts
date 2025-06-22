
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

// Use the Supabase generated types for row/insert/update
type ProjectRow = {
  id: string;
  name: string;
  description: string | null;
  type: 'code_project' | 'documentation' | 'api_spec';
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  tech_stack: string[] | null;
  ai_model: 'gpt-4' | 'claude' | 'gemini';
  created_at: string;
  updated_at: string;
  user_id: string;
  metadata: any;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Ensure data is valid and properly typed
      const validProjects = (data || []).map(project => ({
        ...project,
        tech_stack: project.tech_stack || [],
        metadata: project.metadata || {}
      })) as Project[];
      
      setProjects(validProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const createProject = useCallback(async (
    projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) return null;

    try {
      setLoading(true);
      
      // Prepare the data for insertion
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

      if (error) throw error;

      // Add the new project to the local state
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
      console.error('Error creating project:', error);
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
  }, [user, toast]);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    try {
      // Optimistic update
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

      // Replace with server data
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...data, tech_stack: data.tech_stack || [], metadata: data.metadata || {} } as Project : p
      ));
      
      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      return data as Project;
    } catch (error) {
      console.error('Error updating project:', error);
      // Revert optimistic update by refetching
      await fetchProjects();
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }, [fetchProjects, toast]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      // Optimistic removal
      const originalProjects = projects;
      setProjects(prev => prev.filter(p => p.id !== id));

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        // Revert on error
        setProjects(originalProjects);
        throw error;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  }, [projects, toast]);

  // Effect to fetch projects when user changes
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Memoize the returned object to prevent unnecessary re-renders
  const memoizedReturn = useMemo(() => ({
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  }), [projects, loading, error, createProject, updateProject, deleteProject, fetchProjects]);

  return memoizedReturn;
};

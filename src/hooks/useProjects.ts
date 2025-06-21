
import { useState, useEffect, useCallback } from 'react';
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
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      // Cast tech_stack to [] for compatibility
      setProjects((data as Project[]) || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
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
      // Optimistically update UI first
      const optimisticProject: Project = {
        id: `temp-${Date.now()}`,
        ...projectData,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setProjects(prev => [optimisticProject, ...prev]);

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Replace optimistic update with real data
      setProjects(prev => prev.map(p => 
        p.id === optimisticProject.id ? (data as Project) : p
      ));

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      return data as Project;
    } catch (error) {
      console.error('Error creating project:', error);
      // Remove optimistic update on error
      setProjects(prev => prev.filter(p => !p.id.startsWith('temp-')));
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
      return null;
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
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Replace with server data
      setProjects(prev => prev.map(p => p.id === id ? (data as Project) : p));
      
      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      return data as Project;
    } catch (error) {
      console.error('Error updating project:', error);
      // Revert optimistic update
      await fetchProjects();
      toast({
        title: "Error",
        description: "Failed to update project",
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
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  }, [projects, toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};

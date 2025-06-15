
export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'code_project' | 'documentation' | 'api_spec';
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  tech_stack: string[];
  ai_model: 'gpt-4' | 'claude' | 'gemini';
  created_at: string;
  updated_at: string;
  user_id: string;
  metadata?: {
    features?: string[];
    timeline?: string;
    complexity?: 'simple' | 'medium' | 'complex' | 'enterprise';
    target_audience?: string;
  };
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: Project['type'];
  template_data: {
    suggested_tech_stack: string[];
    default_features: string[];
    estimated_timeline: string;
  };
}

export interface AIAnalysis {
  project_overview: {
    name: string;
    type: string;
    complexity: string;
    timeline: string;
  };
  tech_stack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
  };
  features: string[];
  recommendations: string[];
}

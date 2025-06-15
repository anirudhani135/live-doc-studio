
import { supabase } from '@/integrations/supabase/client';

export interface AIGenerationRequest {
  prompt: string;
  type: 'documentation' | 'specification' | 'code_analysis' | 'improvement';
  context?: string;
  model?: 'gpt-4' | 'claude' | 'gemini';
}

export interface AIGenerationResponse {
  content: string;
  suggestions: string[];
  metadata: {
    model_used: string;
    tokens_used: number;
    confidence_score: number;
  };
}

export class AIContentService {
  private static instance: AIContentService;

  public static getInstance(): AIContentService {
    if (!AIContentService.instance) {
      AIContentService.instance = new AIContentService();
    }
    return AIContentService.instance;
  }

  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-content', {
        body: {
          prompt: request.prompt,
          type: request.type,
          context: request.context,
          model: request.model || 'gpt-4'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('AI content generation failed:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  async analyzeCode(codeContent: string, language: string): Promise<{
    documentation: string;
    suggestions: string[];
    complexity_score: number;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-analyze-code', {
        body: {
          code: codeContent,
          language
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Code analysis failed:', error);
      throw new Error('Failed to analyze code');
    }
  }

  async improveDocument(content: string, improvementType: 'clarity' | 'completeness' | 'structure'): Promise<{
    improved_content: string;
    changes_made: string[];
    quality_score: number;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-improve-document', {
        body: {
          content,
          improvement_type: improvementType
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Document improvement failed:', error);
      throw new Error('Failed to improve document');
    }
  }

  async generateSpecFromDescription(description: string): Promise<{
    specification: string;
    architecture: string;
    tech_recommendations: string[];
    timeline_estimate: string;
  }> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-spec', {
        body: {
          description
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Specification generation failed:', error);
      throw new Error('Failed to generate specification');
    }
  }
}

export const aiContentService = AIContentService.getInstance();

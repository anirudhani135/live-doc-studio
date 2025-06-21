
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

export interface ProjectAnalysis {
  specification: string;
  architecture: string;
  tech_recommendations: string[];
  timeline_estimate: string;
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

      if (error) {
        console.error('AI content generation error:', error);
        // Return fallback response
        return this.createFallbackResponse(request);
      }
      
      return data;
    } catch (error) {
      console.error('AI content generation failed:', error);
      return this.createFallbackResponse(request);
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
      return {
        documentation: 'Code analysis temporarily unavailable',
        suggestions: ['Review code manually', 'Add proper documentation'],
        complexity_score: 0.5
      };
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
      return {
        improved_content: content,
        changes_made: ['AI improvement temporarily unavailable'],
        quality_score: 0.7
      };
    }
  }

  async generateSpecFromDescription(description: string): Promise<ProjectAnalysis> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-spec', {
        body: {
          description
        }
      });

      if (error) {
        console.error('Spec generation error:', error);
        return this.createFallbackProjectAnalysis(description);
      }
      
      return data;
    } catch (error) {
      console.error('Specification generation failed:', error);
      return this.createFallbackProjectAnalysis(description);
    }
  }

  private createFallbackResponse(request: AIGenerationRequest): AIGenerationResponse {
    return {
      content: `Generated content for: ${request.prompt}\n\nThis is a placeholder response while AI services are being configured.`,
      suggestions: [
        'Configure AI service integration',
        'Review project requirements',
        'Add more detailed specifications'
      ],
      metadata: {
        model_used: request.model || 'fallback',
        tokens_used: 0,
        confidence_score: 0.5
      }
    };
  }

  private createFallbackProjectAnalysis(description: string): ProjectAnalysis {
    const words = description.toLowerCase();
    let techStack = ['React', 'TypeScript', 'Tailwind CSS'];
    
    if (words.includes('mobile')) techStack.push('React Native');
    if (words.includes('database')) techStack.push('PostgreSQL');
    if (words.includes('api')) techStack.push('Node.js', 'Express');
    if (words.includes('auth')) techStack.push('Supabase Auth');

    return {
      specification: `Project Specification for: ${description}\n\nThis project will be built using modern web technologies with a focus on performance and user experience.`,
      architecture: 'Modern web application architecture with component-based frontend and scalable backend services.',
      tech_recommendations: techStack,
      timeline_estimate: '2-4 weeks for MVP development'
    };
  }
}

export const aiContentService = AIContentService.getInstance();

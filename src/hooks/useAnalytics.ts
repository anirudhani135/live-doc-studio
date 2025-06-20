
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  user_id: string;
  metadata?: any;
  timestamp?: string;
}

interface UsageMetrics {
  totalProjects: number;
  aiInteractions: number;
  timeSaved: number;
  tokensUsed: number;
  documentsGenerated: number;
  codeAnalyzed: number;
}

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState<UsageMetrics>({
    totalProjects: 0,
    aiInteractions: 0,
    timeSaved: 0,
    tokensUsed: 0,
    documentsGenerated: 0,
    codeAnalyzed: 0
  });

  const trackEvent = async (eventType: string, metadata: any = {}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const event: AnalyticsEvent = {
        event_type: eventType,
        user_id: user.id,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          page_url: window.location.href
        }
      };

      // For now, we'll store analytics in local state until the analytics_events table is created
      // This prevents the TypeScript errors while maintaining functionality
      console.log('Analytics Event:', event);

      // Update usage metrics based on event type
      updateMetricsFromEvent(eventType, metadata);

    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  };

  const updateMetricsFromEvent = (eventType: string, metadata: any) => {
    setMetrics(prev => {
      const updated = { ...prev };
      
      switch (eventType) {
        case 'project_created':
          updated.totalProjects += 1;
          updated.timeSaved += 8.5; // Estimated time saved per project
          break;
        case 'ai_content_generated':
          updated.aiInteractions += 1;
          updated.tokensUsed += metadata.tokens_used || 1500;
          updated.documentsGenerated += 1;
          break;
        case 'code_analyzed':
          updated.aiInteractions += 1;
          updated.codeAnalyzed += 1;
          updated.tokensUsed += metadata.tokens_used || 800;
          break;
        case 'document_improved':
          updated.aiInteractions += 1;
          updated.tokensUsed += metadata.tokens_used || 1200;
          break;
      }
      
      return updated;
    });
  };

  const getAnalyticsData = async (timeRange: number = 30) => {
    try {
      // For now, return mock data until analytics_events table is created
      const mockData = {
        dailyData: [],
        eventTypes: {},
        totalTokens: metrics.tokensUsed,
        totalTimeSaved: metrics.timeSaved,
        totalEvents: 0
      };
      
      return mockData;

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return null;
    }
  };

  const processAnalyticsEvents = (events: any[]) => {
    const daily = {};
    const eventTypes = {};
    let totalTokens = 0;
    let totalTimeSaved = 0;

    events.forEach(event => {
      const date = event.created_at.split('T')[0];
      
      // Daily aggregation
      if (!daily[date]) {
        daily[date] = { date, events: 0, tokens: 0, time_saved: 0 };
      }
      daily[date].events += 1;
      
      // Event type aggregation
      if (!eventTypes[event.event_type]) {
        eventTypes[event.event_type] = 0;
      }
      eventTypes[event.event_type] += 1;
      
      // Metrics calculation
      if (event.metadata?.tokens_used) {
        totalTokens += event.metadata.tokens_used;
        daily[date].tokens += event.metadata.tokens_used;
      }
      
      if (event.event_type === 'project_created') {
        totalTimeSaved += 8.5;
        daily[date].time_saved += 8.5;
      }
    });

    return {
      dailyData: Object.values(daily),
      eventTypes,
      totalTokens,
      totalTimeSaved,
      totalEvents: events.length
    };
  };

  // Track page views automatically
  useEffect(() => {
    const trackPageView = () => {
      trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title
      });
    };

    trackPageView();
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return {
    metrics,
    trackEvent,
    getAnalyticsData,
    // Convenience methods for common events
    trackProjectCreated: (projectData: any) => trackEvent('project_created', projectData),
    trackAIContentGenerated: (contentType: string, tokens: number) => 
      trackEvent('ai_content_generated', { content_type: contentType, tokens_used: tokens }),
    trackCodeAnalyzed: (language: string, lines: number) => 
      trackEvent('code_analyzed', { language, lines_of_code: lines }),
    trackDocumentImproved: (improvementType: string) => 
      trackEvent('document_improved', { improvement_type: improvementType }),
    trackFeatureUsed: (feature: string, duration?: number) => 
      trackEvent('feature_used', { feature, duration_ms: duration })
  };
};

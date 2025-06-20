
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SecurityValidation {
  isValid: boolean;
  violations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const useSecurityValidation = () => {
  const { user } = useAuth();
  const [validationState, setValidationState] = useState<SecurityValidation>({
    isValid: true,
    violations: [],
    riskLevel: 'low'
  });

  const validateInput = (input: string, type: 'project_name' | 'description' | 'content'): SecurityValidation => {
    const violations: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // Check for potential XSS patterns
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi
    ];

    // Check for SQL injection patterns
    const sqlPatterns = [
      /(\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\bunion\b).*\bfrom\b/gi,
      /['"].*[;].*['"/gi,
      /\b(or|and)\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/gi
    ];

    // Validate input length
    const maxLengths = {
      project_name: 100,
      description: 2000,
      content: 50000
    };

    if (input.length > maxLengths[type]) {
      violations.push(`Input exceeds maximum length of ${maxLengths[type]} characters`);
      riskLevel = 'medium';
    }

    // Check for XSS
    if (xssPatterns.some(pattern => pattern.test(input))) {
      violations.push('Potential XSS content detected');
      riskLevel = 'high';
    }

    // Check for SQL injection
    if (sqlPatterns.some(pattern => pattern.test(input))) {
      violations.push('Potential SQL injection detected');
      riskLevel = 'high';
    }

    // Check for excessive special characters
    const specialCharCount = (input.match(/[<>{}[\]\\]/g) || []).length;
    if (specialCharCount > input.length * 0.1) {
      violations.push('Excessive special characters detected');
      riskLevel = riskLevel === 'high' ? 'high' : 'medium';
    }

    return {
      isValid: violations.length === 0,
      violations,
      riskLevel
    };
  };

  const logSecurityEvent = async (eventType: string, details: any) => {
    if (!user) return;

    try {
      await supabase.from('security_audit_logs').insert({
        user_id: user.id,
        event_type: eventType,
        event_data: details,
        ip_address: '127.0.0.1', // Would be actual IP in production
        user_agent: navigator.userAgent,
        success: true
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe/gi, '&lt;iframe')
      .replace(/<object/gi, '&lt;object')
      .replace(/<embed/gi, '&lt;embed');
  };

  return {
    validateInput,
    logSecurityEvent,
    sanitizeInput,
    validationState
  };
};

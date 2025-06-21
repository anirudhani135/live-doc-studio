
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSecurityValidation } from '@/hooks/useSecurityValidation';
import { motion } from 'framer-motion';

interface ProjectDescriptionStepProps {
  projectData: {
    name: string;
    description: string;
  };
  onUpdate: (data: Partial<{ name: string; description: string }>) => void;
}

const ProjectDescriptionStep: React.FC<ProjectDescriptionStepProps> = ({
  projectData,
  onUpdate
}) => {
  const { validateInput, sanitizeInput } = useSecurityValidation();
  const [nameValidation, setNameValidation] = useState({ isValid: true, violations: [] });
  const [descValidation, setDescValidation] = useState({ isValid: true, violations: [] });
  const [suggestions] = useState([
    "AI-powered task management",
    "Smart document analyzer", 
    "Real-time collaboration tool",
    "Automated workflow system"
  ]);

  useEffect(() => {
    if (projectData.name) {
      const validation = validateInput(projectData.name, 'project_name');
      setNameValidation(validation);
    }
  }, [projectData.name, validateInput]);

  useEffect(() => {
    if (projectData.description) {
      const validation = validateInput(projectData.description, 'description');
      setDescValidation(validation);
    }
  }, [projectData.description, validateInput]);

  const handleNameChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    onUpdate({ name: sanitized });
  };

  const handleDescriptionChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    onUpdate({ description: sanitized });
  };

  const useSuggestion = (suggestion: string) => {
    onUpdate({ description: projectData.description + (projectData.description ? ' ' : '') + suggestion });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="projectName" className="text-sm font-medium">
          Project Name
        </Label>
        <div className="relative">
          <Input
            id="projectName"
            value={projectData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter a descriptive project name..."
            className={`transition-all duration-200 ${
              !nameValidation.isValid ? 'border-destructive focus:border-destructive' : 
              projectData.name ? 'border-green-500 focus:border-green-500' : ''
            }`}
          />
          {projectData.name && nameValidation.isValid && (
            <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
          )}
        </div>
        
        {!nameValidation.isValid && (
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {nameValidation.violations.join(', ')}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectDescription" className="text-sm font-medium">
          Project Description
        </Label>
        <Textarea
          id="projectDescription"
          value={projectData.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Describe your project goals, target audience, key features, and any specific requirements..."
          className={`min-h-[120px] transition-all duration-200 resize-none ${
            !descValidation.isValid ? 'border-destructive focus:border-destructive' : 
            projectData.description ? 'border-green-500 focus:border-green-500' : ''
          }`}
        />
        
        {!descValidation.isValid && (
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {descValidation.violations.join(', ')}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground">
          {projectData.description.length}/2000 characters
        </div>
      </div>

      {projectData.description.length < 50 && (
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            Quick Ideas
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => useSuggestion(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectDescriptionStep;

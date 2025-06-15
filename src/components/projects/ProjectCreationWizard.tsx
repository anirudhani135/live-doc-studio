import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Brain,
  FileText,
  Code,
  Zap,
  Users,
  Settings,
  Download,
  Monitor
} from 'lucide-react';
import { aiContentService } from '@/lib/ai-content-service';
import { useToast } from '@/hooks/use-toast';
import { ProjectQuestionnaire } from '@/types/questionnaire';

interface ProjectCreationWizardProps {
  onComplete: (projectData: any) => void;
  onCancel: () => void;
}

const ProjectCreationWizard: React.FC<ProjectCreationWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    description: '',
    selectedModel: 'gpt-4',
    questionnaire: {} as ProjectQuestionnaire,
    analysis: null,
    documentation: null,
    refinements: [],
    integrations: [],
    exportSettings: {},
    monitoringConfig: {}
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Project Description', icon: FileText },
    { id: 2, title: 'AI Tool Selection', icon: Brain },
    { id: 3, title: 'Interactive Questionnaire', icon: Users },
    { id: 4, title: 'AI Analysis', icon: Sparkles },
    { id: 5, title: 'Documentation Generation', icon: FileText },
    { id: 6, title: 'Review & Refinement', icon: CheckCircle },
    { id: 7, title: 'Integration Setup', icon: Zap },
    { id: 8, title: 'Export & Sharing', icon: Download },
    { id: 9, title: 'Project Monitoring', icon: Monitor }
  ];

  const aiModels = [
    { 
      id: 'gpt-4', 
      name: 'GPT-4', 
      description: 'Most capable for complex projects',
      performance: 'High',
      cost: 'High',
      capabilities: ['Code Generation', 'Documentation', 'Analysis']
    },
    { 
      id: 'claude', 
      name: 'Claude', 
      description: 'Excellent for documentation',
      performance: 'High',
      cost: 'Medium',
      capabilities: ['Documentation', 'Writing', 'Analysis']
    },
    { 
      id: 'gemini', 
      name: 'Gemini', 
      description: 'Great for code generation',
      performance: 'Medium',
      cost: 'Low',
      capabilities: ['Code Generation', 'Quick Tasks']
    }
  ];

  const suggestionChips = [
    "Purpose & Goals", 
    "Target Audience", 
    "Key Features", 
    "Tech Stack", 
    "Design Preferences",
    "Integration Needs",
    "Performance Requirements",
    "Security Considerations"
  ];

  const questionnaireQuestions = [
    {
      id: 'projectType',
      question: 'What type of project are you building?',
      type: 'select',
      options: ['Web Application', 'Mobile App', 'API Service', 'Desktop Application', 'Other']
    },
    {
      id: 'targetUsers',
      question: 'Who are your target users?',
      type: 'text',
      placeholder: 'Describe your target audience...'
    },
    {
      id: 'timeline',
      question: 'What is your expected timeline?',
      type: 'select',
      options: ['1-2 weeks', '1-2 months', '3-6 months', '6+ months']
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      type: 'select',
      options: ['Under $10k', '$10k-$50k', '$50k-$100k', '$100k+', 'Not specified']
    },
    {
      id: 'team_size',
      question: 'How many people will work on this project?',
      type: 'select',
      options: ['Just me', '2-3 people', '4-10 people', '10+ people']
    }
  ];

  const handleNext = async () => {
    if (currentStep === 4) {
      await generateAnalysis();
    } else if (currentStep === 5) {
      await generateDocumentation();
    }
    
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateAnalysis = async () => {
    setIsProcessing(true);
    try {
      const response = await aiContentService.generateSpecFromDescription(projectData.description);
      setProjectData(prev => ({ ...prev, analysis: response }));
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your project requirements",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate project analysis",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateDocumentation = async () => {
    setIsProcessing(true);
    try {
      const response = await aiContentService.generateContent({
        prompt: `Generate comprehensive project documentation for: ${projectData.description}`,
        type: 'documentation',
        context: JSON.stringify(projectData.questionnaire)
      });
      setProjectData(prev => ({ ...prev, documentation: response }));
      toast({
        title: "Documentation Generated",
        description: "Project documentation has been created",
      });
    } catch (error) {
      toast({
        title: "Documentation Failed",
        description: "Failed to generate documentation",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Describe Your Project</h3>
              <p className="text-muted-foreground mb-4">
                Provide a detailed description of what you want to build. Be specific about features, goals, and requirements.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestionChips.map(chip => (
                  <Badge 
                    key={chip}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      const addition = `\n\n${chip}: `;
                      setProjectData(prev => ({ 
                        ...prev, 
                        description: prev.description + addition 
                      }));
                    }}
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
              
              <Textarea
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="I want to build a comprehensive project management tool that helps teams collaborate effectively. It should include task management, real-time chat, file sharing, and project analytics..."
                className="min-h-[200px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose AI Model</h3>
              <p className="text-muted-foreground mb-4">
                Select the AI model that best fits your project needs and budget.
              </p>
              
              <div className="grid gap-4">
                {aiModels.map((model) => (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer transition-all ${
                      projectData.selectedModel === model.id
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setProjectData(prev => ({ ...prev, selectedModel: model.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{model.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{model.description}</p>
                          <div className="flex gap-2">
                            {model.capabilities.map(cap => (
                              <Badge key={cap} variant="secondary" className="text-xs">
                                {cap}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Performance</div>
                          <div className="font-medium">{model.performance}</div>
                          <div className="text-xs text-muted-foreground mt-1">Cost</div>
                          <div className="font-medium">{model.cost}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <p className="text-muted-foreground mb-4">
                Answer a few questions to help us better understand your project requirements.
              </p>
              
              <div className="space-y-4">
                {questionnaireQuestions.map((q) => (
                  <div key={q.id} className="space-y-2">
                    <label className="text-sm font-medium">{q.question}</label>
                    {q.type === 'select' ? (
                      <Select
                        value={projectData.questionnaire[q.id as keyof ProjectQuestionnaire] || ''}
                        onValueChange={(value) => setProjectData(prev => ({
                          ...prev,
                          questionnaire: { ...prev.questionnaire, [q.id]: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {q.options.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={projectData.questionnaire[q.id as keyof ProjectQuestionnaire] || ''}
                        onChange={(e) => setProjectData(prev => ({
                          ...prev,
                          questionnaire: { ...prev.questionnaire, [q.id]: e.target.value }
                        }))}
                        placeholder={q.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is analyzing your project requirements and generating recommendations.
              </p>
              
              {isProcessing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
                    <p>Analyzing your project...</p>
                  </div>
                </div>
              ) : projectData.analysis ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Architecture Recommendations</h5>
                        <p className="text-sm text-muted-foreground">{projectData.analysis.architecture}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Technology Stack</h5>
                        <div className="flex flex-wrap gap-1">
                          {projectData.analysis.tech_recommendations.map(tech => (
                            <Badge key={tech} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Timeline Estimate</h5>
                        <p className="text-sm">{projectData.analysis.timeline_estimate}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>Click "Next" to start the analysis</p>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documentation Generation</h3>
              <p className="text-muted-foreground mb-4">
                Generate comprehensive project documentation based on your requirements.
              </p>
              
              {isProcessing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <FileText className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
                    <p>Generating documentation...</p>
                  </div>
                </div>
              ) : projectData.documentation ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Generated Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm whitespace-pre-wrap">
                        {projectData.documentation.content.substring(0, 500)}...
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {projectData.documentation.suggestions.map((suggestion, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8">
                  <p>Click "Next" to generate documentation</p>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review & Refinement</h3>
              <p className="text-muted-foreground mb-4">
                Review the generated content and request any refinements.
              </p>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">AI Model:</span> {projectData.selectedModel.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Project Type:</span> {projectData.questionnaire.projectType || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Timeline:</span> {projectData.questionnaire.timeline || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Team Size:</span> {projectData.questionnaire.team_size || 'Not specified'}
                    </div>
                  </CardContent>
                </Card>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Refinement Notes (Optional)</label>
                  <Textarea
                    placeholder="Add any specific refinements or changes you'd like..."
                    className="min-h-[100px]"
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      refinements: [...prev.refinements, e.target.value]
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Integration Setup</h3>
              <p className="text-muted-foreground mb-4">
                Configure integrations with your development tools and platforms.
              </p>
              
              <div className="space-y-4">
                {[
                  { name: 'GitHub', description: 'Version control and code repository', icon: Code },
                  { name: 'Slack', description: 'Team communication and notifications', icon: Users },
                  { name: 'Jira', description: 'Project management and issue tracking', icon: Settings },
                  { name: 'CI/CD Pipeline', description: 'Automated testing and deployment', icon: Zap }
                ].map((integration) => (
                  <Card key={integration.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <integration.icon className="h-5 w-5" />
                        <div>
                          <h5 className="font-medium">{integration.name}</h5>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={projectData.integrations.includes(integration.name)}
                        onCheckedChange={(checked) => {
                          setProjectData(prev => ({
                            ...prev,
                            integrations: checked
                              ? [...prev.integrations, integration.name]
                              : prev.integrations.filter(i => i !== integration.name)
                          }));
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Export & Sharing</h3>
              <p className="text-muted-foreground mb-4">
                Configure how you want to export and share your project documentation.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Export Formats</label>
                  <div className="flex gap-2">
                    {['PDF', 'Markdown', 'HTML', 'Word'].map(format => (
                      <Badge
                        key={format}
                        variant={projectData.exportSettings[format] ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => setProjectData(prev => ({
                          ...prev,
                          exportSettings: {
                            ...prev.exportSettings,
                            [format]: !prev.exportSettings[format]
                          }
                        }))}
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Sharing Options</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="public-link" />
                      <label htmlFor="public-link" className="text-sm">Generate public sharing link</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="team-access" />
                      <label htmlFor="team-access" className="text-sm">Grant team member access</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-sync" />
                      <label htmlFor="auto-sync" className="text-sm">Enable automatic synchronization</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Monitoring</h3>
              <p className="text-muted-foreground mb-4">
                Set up monitoring and tracking for your project's progress and performance.
              </p>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Monitoring Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Real-time Progress Tracking</h5>
                        <p className="text-sm text-muted-foreground">Monitor project milestones and completion</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Performance Analytics</h5>
                        <p className="text-sm text-muted-foreground">Track team productivity and efficiency</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Predictive Alerts</h5>
                        <p className="text-sm text-muted-foreground">Get notified about potential issues</p>
                      </div>
                      <Checkbox />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Project Setup Complete!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your project is ready to be created with all the configured settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / 9) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Project Creation Wizard
              </CardTitle>
              <p className="text-muted-foreground">
                Step {currentStep} of 9: {steps[currentStep - 1]?.title}
              </p>
            </div>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${currentStep > step.id ? 'bg-green-500' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep === 9 ? (
              <Button onClick={() => onComplete(projectData)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={isProcessing || (currentStep === 1 && !projectData.description.trim())}
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectCreationWizard;

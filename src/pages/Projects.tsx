
import { HelpGuide } from "@/components/HelpGuide";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Sparkles, Zap, Brain, ChevronRight } from "lucide-react";
import { useState } from "react";

const suggestionChips = [
  "Purpose & Goals", 
  "Target Audience", 
  "Key Features", 
  "Tech Stack", 
  "Design Preferences",
  "Integration Needs"
];

const aiModels = [
  { name: "GPT-4", description: "Most capable for complex projects", speed: "Medium", accuracy: "High" },
  { name: "Claude", description: "Excellent for documentation", speed: "Fast", accuracy: "High" },
  { name: "Gemini", description: "Great for code generation", speed: "Very Fast", accuracy: "Medium" }
];

const Projects = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!projectDescription.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="flex h-full bg-slate-50">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-slate-800 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-blue-600" />
              What do you want to build?
            </h1>
            <p className="text-muted-foreground text-lg">
              Describe your project in detail. Our AI will generate comprehensive documentation, 
              architecture diagrams, and implementation roadmaps.
            </p>
          </div>

          {/* AI Model Selection */}
          <div className="mb-6 p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Choose AI Model
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aiModels.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setSelectedModel(model.name)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedModel === model.name
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-slate-800">{model.name}</div>
                  <div className="text-sm text-slate-600 mb-2">{model.description}</div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                      {model.speed}
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                      {model.accuracy}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-sm font-medium text-slate-600 shrink-0">Include details about:</p>
            <div className="flex flex-wrap items-center gap-2">
              {suggestionChips.map(chip => (
                <Button 
                  key={chip} 
                  variant="outline" 
                  size="sm" 
                  className="bg-white rounded-full font-normal hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => {
                    const addition = `\n\n${chip}: `;
                    setProjectDescription(prev => prev + addition);
                  }}
                >
                  {chip}
                </Button>
              ))}
            </div>
          </div>

          {/* Template Button */}
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <FileText className="h-4 w-4 mr-2"/>
              Use Template
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <Zap className="h-4 w-4 mr-2"/>
              Import from GitHub
            </Button>
          </div>
          
          {/* Main Input */}
          <div className="mb-6">
            <Textarea 
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="I want to build a comprehensive CRM tool for e-commerce store owners to manage clients, track sales, monitor inventory, orchestrate marketing campaigns, and communicate with clients efficiently. This platform should centralize customer data, streamline sales workflows, provide advanced reporting features, and include AI-powered insights for business optimization."
              className="min-h-[200px] text-base bg-white border-2 focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Generate Button */}
          <div className="mb-8">
            <Button 
              onClick={handleGenerate}
              disabled={!projectDescription.trim() || isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Generating with {selectedModel}...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Project with AI
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* AI Output Preview */}
          {(projectDescription || isGenerating) && (
            <div className="border-t pt-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-700">
                <Brain className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">AI-Generated Project Analysis</h3>
              </div>
              
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg bg-white space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Project Overview
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> EcommerceCRM Pro</p>
                      <p><span className="font-medium">Type:</span> Full-stack Web Application</p>
                      <p><span className="font-medium">Complexity:</span> Enterprise-level</p>
                      <p><span className="font-medium">Timeline:</span> 12-16 weeks</p>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg bg-white space-y-3">
                    <h4 className="font-semibold text-slate-800">Tech Stack Recommendations</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Frontend:</span> React, TypeScript, Tailwind</p>
                      <p><span className="font-medium">Backend:</span> Node.js, Express, PostgreSQL</p>
                      <p><span className="font-medium">Auth:</span> Supabase Auth</p>
                      <p><span className="font-medium">Hosting:</span> Vercel + Supabase</p>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg bg-white space-y-3 md:col-span-2">
                    <h4 className="font-semibold text-slate-800">Core Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <ul className="space-y-1">
                        <li>• Customer Management System</li>
                        <li>• Sales Pipeline Tracking</li>
                        <li>• Inventory Management</li>
                        <li>• Order Processing</li>
                      </ul>
                      <ul className="space-y-1">
                        <li>• Marketing Campaign Tools</li>
                        <li>• Communication Hub</li>
                        <li>• Analytics Dashboard</li>
                        <li>• AI-Powered Insights</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Documentation
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Start Building Project
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <HelpGuide />
    </div>
  );
};

export default Projects;

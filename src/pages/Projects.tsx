
import { HelpGuide } from "@/components/HelpGuide";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Sparkles, Zap, Wand2 } from "lucide-react";

const suggestionChips = ["Purpose", "Target Audience", "Key Features", "Design Preferences"];

const Projects = () => {
  return (
    <div className="flex h-full bg-gradient-to-br from-neutral-50 to-neutral-100">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
            {/* Enhanced Header with Icon */}
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-primary shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-2 gradient-text">What do you want to build?</h1>
                    <p className="text-secondary text-base">
                        Describe your project in detail. The more specific you are, the better we can help you bring your vision to life.
                    </p>
                </div>
            </div>
            
            {/* Enhanced Suggestion Chips */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-card rounded-xl border border-border-light shadow-sm">
                <div className="flex items-center gap-2 shrink-0">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-tertiary">Try to include:</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {suggestionChips.map(chip => (
                        <Button 
                            key={chip} 
                            variant="outline" 
                            size="sm" 
                            className="bg-surface-elevated rounded-full font-normal text-tertiary border-border hover:bg-primary-50 hover:text-primary hover:border-primary-200 transition-all duration-200"
                        >
                            {chip}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Enhanced Template Button */}
            <div className="flex items-center gap-2 mb-6">
                <Button 
                    variant="outline" 
                    className="bg-surface-elevated border-border hover:bg-surface-hover hover:text-primary transition-all duration-200 group"
                >
                    <FileText className="h-4 w-4 mr-2 group-hover:text-primary transition-colors"/>
                    Use Template
                </Button>
            </div>
            
            {/* Enhanced Textarea */}
            <div className="relative">
                <Textarea 
                    placeholder="I want to build a CRM tool for e-commerce store owners to manage clients, track sales, track inventory, manage marketing campaigns, and communicate with clients efficiently. This tool centralizes customer data, streamlines sales workflows, and provides reporting features."
                    className="min-h-[200px] text-base bg-surface-elevated border-border text-secondary focus:border-primary focus:ring-primary-200 focus:ring-2 transition-all duration-200 shadow-sm"
                />
                <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 text-xs text-quaternary">
                        <Zap className="h-3 w-3" />
                        <span>AI Enhanced</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Preview Section */}
            <div className="mt-8 border-t border-border pt-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-info-light">
                        <Sparkles className="h-4 w-4 text-info" />
                    </div>
                    <p className="text-sm text-tertiary font-medium">
                        AI-Generated Project Analysis Preview
                    </p>
                </div>
                
                <div className="p-6 border border-border rounded-xl bg-gradient-card space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-surface-elevated rounded-lg border border-border-light">
                            <p className="font-semibold text-primary text-sm mb-1">Project Name</p>
                            <p className="text-secondary text-sm">"Desmily CRM"</p>
                        </div>
                        <div className="p-4 bg-surface-elevated rounded-lg border border-border-light">
                            <p className="font-semibold text-primary text-sm mb-1">Target Audience</p>
                            <p className="text-secondary text-sm">E-commerce store owners</p>
                        </div>
                        <div className="p-4 bg-surface-elevated rounded-lg border border-border-light">
                            <p className="font-semibold text-primary text-sm mb-1">Core Features</p>
                            <p className="text-secondary text-sm">Contact management, Analytics</p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                        <p className="font-semibold text-primary text-sm mb-2">Technology Stack Recommendation</p>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Node.js", "PostgreSQL", "TypeScript"].map(tech => (
                                <span key={tech} className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-md border border-primary-200">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced CTA */}
                <div className="flex justify-center pt-6">
                    <Button className="bg-gradient-primary text-white px-8 py-3 text-base font-semibold rounded-lg shadow-colored hover:shadow-lg transition-all duration-200 group">
                        <Sparkles className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                        Generate Project Specification
                    </Button>
                </div>
            </div>
        </div>
      </main>
      <HelpGuide />
    </div>
  );
};

export default Projects;

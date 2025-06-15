
import { HelpGuide } from "@/components/HelpGuide";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

const suggestionChips = ["Purpose", "Target: Audience", "Key Features", "Design Preferences"];

const Projects = () => {
  return (
    <div className="flex h-full bg-surface-sunken">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-primary">What do you want to build?</h1>
            <p className="text-muted text-base mb-8">
                Describe your project in detail. The more specific you are, the better we can help you bring your vision to life.
            </p>
            
            <div className="flex items-center gap-4 mb-4">
                <p className="text-sm font-medium text-secondary shrink-0">Try to include:</p>
                <div className="flex flex-wrap items-center gap-2">
                    {suggestionChips.map(chip => (
                        <Button 
                            key={chip} 
                            variant="outline" 
                            size="sm" 
                            className="bg-white rounded-full font-normal text-muted border-border hover:bg-surface-hover hover:text-primary transition-colors"
                        >
                            {chip}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <Button variant="outline" className="bg-white border-border hover:bg-surface-hover hover:text-primary transition-colors">
                    <FileText className="h-4 w-4 mr-2"/>
                    Use Template
                </Button>
            </div>
            
            <Textarea 
                placeholder="I want to build a CRM tool for e-commerce store owners to manage clients, track sales, track inventory, manage marketing campaigns, and communicate with clients efficiently. This tool centralizes customer data, streamlines sales workflows, and provides reporting features."
                className="min-h-[200px] text-base bg-white border-border text-secondary focus:border-primary focus:ring-primary"
            />

            <div className="mt-6 border-t border-border pt-6 space-y-4">
                <p className="text-sm text-muted">
                    This is where the structured output from your description will appear. For example:
                </p>
                <div className="p-4 border border-border rounded-lg bg-white space-y-2 surface-elevated">
                    <p><span className="font-semibold text-primary">Project Name:</span> <span className="text-secondary">"Desmily CRM"</span></p>
                    <p><span className="font-semibold text-primary">Target Audience:</span> <span className="text-secondary">small to medium-sized e-commerce stores, local businesses</span></p>
                    <p><span className="font-semibold text-primary">Core Features:</span> <span className="text-secondary">Contact management, Unified Customer Profiles, etc.</span></p>
                </div>
            </div>
        </div>
      </main>
      <HelpGuide />
    </div>
  );
};

export default Projects;

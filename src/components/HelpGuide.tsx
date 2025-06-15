
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Target, Code2, TestTube, FileText, Lightbulb } from "lucide-react";

const helpItems = [
    {
        title: "Project Architecture",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
        content: "Use microservices for scalability. Monolithic for smaller applications. Consider serverless for cost optimization.",
        icon: <Target className="h-4 w-4 text-blue-600" />
    },
    {
        title: "Code Standards",
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
        content: "Follow language-specific conventions. Implement ESLint and Prettier. Use TypeScript for type safety.",
        icon: <Code2 className="h-4 w-4 text-emerald-600" />
    },
    {
        title: "Testing Strategy",
        bgColor: "bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200",
        content: "Unit tests for core functions. Integration tests for APIs. E2E tests for critical user flows. Aim for 80% coverage.",
        icon: <TestTube className="h-4 w-4 text-violet-600" />
    },
    {
        title: "Documentation",
        bgColor: "bg-gradient-to-br from-neutral-50 to-neutral-100 border-neutral-200",
        content: "Maintain clear README files. API documentation with Swagger/OpenAPI. Keep inline comments meaningful and updated.",
        icon: <FileText className="h-4 w-4 text-neutral-600" />
    }
];

export function HelpGuide() {
    return (
        <aside className="hidden lg:block w-[380px] bg-gradient-to-b from-surface-elevated to-surface-sunken border-l border-border p-6 shrink-0">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-primary rounded-xl shadow-sm">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Book className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-white">Help Guide</h2>
                    <p className="text-sm text-white/80">Best practices for software projects</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {helpItems.map((item, index) => (
                    <Card 
                        key={item.title} 
                        className={`${item.bgColor} shadow-sm rounded-xl surface-hover transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-semibold text-primary flex items-center gap-2">
                                {item.icon}
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-xs text-tertiary leading-relaxed">{item.content}</p>
                        </CardContent>
                    </Card>
                ))}
                
                {/* Enhanced Pro Tip */}
                <div className="mt-6 p-4 bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-accent-600" />
                        <h3 className="text-sm font-semibold text-accent-700">Pro Tip</h3>
                    </div>
                    <p className="text-xs text-accent-600 leading-relaxed">
                        Start with a clear problem statement and user stories before diving into technical implementation. This helps ensure your solution addresses real user needs.
                    </p>
                </div>
            </div>
        </aside>
    );
}

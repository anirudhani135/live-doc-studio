
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const helpItems = [
    {
        title: "Project Architecture",
        bgColor: "bg-destructive-light border-destructive/20",
        content: "Use microservices for scalability. Monolithic for smaller applications. Consider serverless for cost optimization."
    },
    {
        title: "Code Standards",
        bgColor: "bg-info-light border-info/20",
        content: "Follow language-specific conventions. Implement ESLint and Prettier. Use TypeScript for type safety."
    },
    {
        title: "Testing Strategy",
        bgColor: "bg-success-light border-success/20",
        content: "Unit tests for core functions. Integration tests for APIs. E2E tests for critical user flows. Aim for 80% coverage."
    },
    {
        title: "Documentation",
        bgColor: "bg-surface-elevated border-border",
        content: "Maintain clear README files. API documentation with Swagger/OpenAPI. Keep inline comments meaningful and updated."
    }
];

export function HelpGuide() {
    return (
        <aside className="hidden lg:block w-[380px] bg-surface-elevated border-l border-border p-6 shrink-0">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-light p-2 rounded-lg border border-primary/20">
                    <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-primary">Help Guide</h2>
                    <p className="text-sm text-tertiary">Best practices for software projects</p>
                </div>
            </div>
            <div className="space-y-3">
                {helpItems.map((item) => (
                    <Card key={item.title} className={`${item.bgColor} shadow-none rounded-lg surface-hover`}>
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-semibold text-primary flex items-center gap-2">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-xs text-tertiary leading-relaxed">{item.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </aside>
    );
}

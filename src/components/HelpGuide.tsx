
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const helpItems = [
    {
        title: "Project Architecture",
        bgColor: "bg-red-50 border-red-100",
        content: "Use microservices for scalability. Monolithic for smaller applications. Consider serverless for cost optimization."
    },
    {
        title: "Code Standards",
        bgColor: "bg-violet-50 border-violet-100",
        content: "Follow language-specific conventions. Implement ESLint and Prettier. Use TypeScript for type safety."
    },
    {
        title: "Testing Strategy",
        bgColor: "bg-green-50 border-green-100",
        content: "Unit tests for core functions. Integration tests for APIs. E2E tests for critical user flows. Aim for 80% coverage."
    },
    {
        title: "Documentation",
        bgColor: "bg-amber-50 border-amber-100",
        content: "Maintain clear README files. API documentation with Swagger/OpenAPI. Keep inline comments meaningful and updated."
    }
];

export function HelpGuide() {
    return (
        <aside className="hidden lg:block w-[380px] bg-white border-l p-6 shrink-0">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg border border-blue-200">
                    <Book className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-slate-800">Help Guide</h2>
                    <p className="text-sm text-slate-500">Best practices for software projects</p>
                </div>
            </div>
            <div className="space-y-3">
                {helpItems.map((item) => (
                    <Card key={item.title} className={`${item.bgColor} shadow-none border rounded-lg`}>
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </aside>
    );
}

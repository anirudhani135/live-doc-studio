
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    name: "Collaboration AI",
    description: "Workspace for the new AI pair-programming assistant prototype.",
    updated: "2 hours ago",
  },
  {
    id: 2,
    name: "Livedoc Marketing",
    description: "Docs, specs and diagrams for Livedoc's public launch.",
    updated: "1 day ago",
  },
  {
    id: 3,
    name: "Onboarding Flows",
    description: "Spec & UI for new user guide and activation process.",
    updated: "5 days ago",
  },
];

const Dashboard = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-6 flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Welcome to Livedoc</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          This is your workspace overview. Jump into a project or create a new one to get productive.
        </p>
      </div>

      {/* Project Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="transition-shadow shadow-md hover:shadow-xl border border-border bg-card/95 hover:bg-primary/10 cursor-pointer group"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary">{project.name}</CardTitle>
              <CardDescription className="truncate text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <span className="inline-block text-xs text-muted-foreground">Last updated: {project.updated}</span>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="ml-auto">Open</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface TechStackStepProps {
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

const TechStackStep: React.FC<TechStackStepProps> = ({
  selectedTech,
  onToggle
}) => {
  const techCategories = [
    {
      category: 'Frontend',
      technologies: [
        'React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
        'Tailwind CSS', 'Bootstrap', 'Sass', 'Next.js', 'Nuxt.js'
      ]
    },
    {
      category: 'Backend',
      technologies: [
        'Node.js', 'Express', 'Python', 'Django', 'FastAPI',
        'PHP', 'Laravel', 'Ruby', 'Rails', 'Java', 'Spring'
      ]
    },
    {
      category: 'Database',
      technologies: [
        'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite',
        'Supabase', 'Firebase', 'PlanetScale', 'Prisma'
      ]
    },
    {
      category: 'Cloud & Tools',
      technologies: [
        'AWS', 'Vercel', 'Netlify', 'Docker', 'Git',
        'GitHub Actions', 'Stripe', 'Auth0', 'Sendgrid'
      ]
    }
  ];

  const isSelected = (tech: string) => selectedTech.includes(tech);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
        <p className="text-muted-foreground mb-6">
          Select the technologies you want to use or are familiar with. Don't worry if you're not sure - our AI will make recommendations.
        </p>
      </div>

      <div className="space-y-6">
        {techCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category.category}</CardTitle>
              <CardDescription>
                Choose from popular {category.category.toLowerCase()} technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant={isSelected(tech) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all ${
                      isSelected(tech)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={() => onToggle(tech)}
                  >
                    {isSelected(tech) && <Check className="h-3 w-3 mr-1" />}
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTech.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Selected Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedTech.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TechStackStep;

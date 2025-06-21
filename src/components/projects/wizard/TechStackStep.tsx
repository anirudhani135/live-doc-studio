
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechStackStepProps {
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

const TechStackStep: React.FC<TechStackStepProps> = ({
  selectedTech,
  onToggle
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const technologies = [
    { name: 'React', category: 'Frontend', popular: true },
    { name: 'TypeScript', category: 'Language', popular: true },
    { name: 'Node.js', category: 'Backend', popular: true },
    { name: 'PostgreSQL', category: 'Database', popular: true },
    { name: 'Supabase', category: 'Backend', popular: true },
    { name: 'Tailwind CSS', category: 'Styling', popular: true },
    { name: 'Python', category: 'Language', popular: true },
    { name: 'Docker', category: 'DevOps', popular: false },
    { name: 'AWS', category: 'Cloud', popular: false },
    { name: 'Firebase', category: 'Backend', popular: false },
    { name: 'MongoDB', category: 'Database', popular: false },
    { name: 'Redis', category: 'Database', popular: false },
    { name: 'Next.js', category: 'Frontend', popular: false },
    { name: 'Vue.js', category: 'Frontend', popular: false },
    { name: 'Express.js', category: 'Backend', popular: false },
    { name: 'GraphQL', category: 'API', popular: false },
  ];

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(technologies.map(tech => tech.category))];

  const getTechsByCategory = (category: string) => 
    filteredTechnologies.filter(tech => tech.category === category);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label className="text-sm font-medium">Technology Stack</Label>
        <p className="text-sm text-muted-foreground">
          Select the technologies you plan to use in your project
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {selectedTech.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <Label className="text-sm font-medium text-primary">Selected ({selectedTech.length})</Label>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedTech.map((tech) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="default"
                    className="cursor-pointer hover:bg-primary/80 transition-colors flex items-center gap-1"
                    onClick={() => onToggle(tech)}
                  >
                    <Check className="h-3 w-3" />
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {categories.map((category) => {
          const categoryTechs = getTechsByCategory(category);
          if (categoryTechs.length === 0) return null;

          return (
            <motion.div
              key={category}
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryTechs.map((tech) => {
                  const isSelected = selectedTech.includes(tech.name);
                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Badge
                        variant={isSelected ? 'default' : 'outline'}
                        className={`cursor-pointer justify-center p-3 text-center transition-all duration-200 w-full relative ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'hover:bg-accent hover:text-accent-foreground border-2'
                        } ${tech.popular ? 'border-amber-200 bg-amber-50/50' : ''}`}
                        onClick={() => onToggle(tech.name)}
                      >
                        {tech.popular && !isSelected && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></div>
                        )}
                        {isSelected && <Check className="h-3 w-3 mr-1" />}
                        {tech.name}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedTech.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-muted-foreground"
        >
          <p className="text-sm">Select at least one technology to continue</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TechStackStep;


import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  image?: string;
}

export function FeatureCard({ icon: Icon, title, description, image }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
      <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
        <CardHeader className="p-6">
          <div className="mb-4 p-3 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-100 transition-colors">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          
          {image && (
            <div className="mb-4 -mx-6 -mt-2">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
              />
            </div>
          )}
          
          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}


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
      whileHover={{ y: -4, scale: 1.04, boxShadow: "0 8px 32px rgba(30,64,175,0.04)" }}
      transition={{ type: "spring", stiffness: 220, damping: 19 }}
      className="w-full"
    >
      <Card className="bg-[#ffffff]/80 border border-[#f1f5f9] shadow hover:shadow-md transition rounded-2xl flex flex-col h-full">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#e0e7ff] rounded-full p-3 mb-2 shadow-sm">
              <Icon className="w-6 h-6 text-[#1e40af]" />
            </div>
            {image && (
              <img src={image} alt={title} className="h-24 w-full object-cover rounded-lg mb-1 shadow" />
            )}
            <CardTitle className="text-lg font-bold text-center">{title}</CardTitle>
            <CardDescription className="text-base text-[#475569] text-center">{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

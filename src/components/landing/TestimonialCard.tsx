
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  company: string;
  avatar: string;
  logo: string;
}

export function TestimonialCard({ name, role, quote, company, avatar, logo }: TestimonialCardProps) {
  return (
    <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <img src={avatar} alt={name} className="rounded-full object-cover" />
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{role}</div>
            <div className="text-sm text-gray-500">{company}</div>
          </div>
        </div>
        
        <blockquote className="text-gray-700 italic leading-relaxed mb-4">
          "{quote}"
        </blockquote>
        
        <div className="flex justify-end">
          <img src={logo} alt={company} className="h-6 w-auto opacity-60" />
        </div>
      </CardContent>
    </Card>
  );
}

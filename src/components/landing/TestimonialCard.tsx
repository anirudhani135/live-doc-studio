
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
    <Card className="border border-[#f1f5f9] bg-white/90 rounded-2xl shadow flex flex-col h-full">
      <CardHeader className="flex flex-col items-center justify-center pt-8 pb-2">
        <Avatar>
          <img src={avatar} alt={name} className="rounded-full h-14 w-14 object-cover" />
        </Avatar>
        <div className="mt-3 font-bold">{name}</div>
        <div className="text-sm text-[#475569] font-medium">{role} &mdash; <span className="font-normal">{company}</span></div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-6 items-center text-center">
        <p className="text-base italic text-[#0f172a] mt-1 mb-2">“{quote}”</p>
        <img src={logo} alt={company} className="h-7 mt-2 opacity-80" />
      </CardContent>
    </Card>
  );
}

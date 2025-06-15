
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  delay?: number;
}

export function EnhancedCard({
  title,
  description,
  children,
  className,
  hover = true,
  gradient = false,
  delay = 0,
}: EnhancedCardProps) {
  return (
    <Card 
      className={cn(
        "border-0 shadow-sm transition-all duration-300 animate-fade-in",
        hover && "card-hover cursor-pointer",
        gradient && "bg-gradient-to-br from-card to-surface-elevated",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && (
            <CardTitle className="text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={title || description ? "pt-0" : ""}>
        {children}
      </CardContent>
    </Card>
  );
}


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export function MetricCard({
  label,
  value,
  subtitle,
  icon,
  trend,
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <Card 
      className={cn(
        "metric-card group cursor-pointer animate-scale-in border-0 shadow-sm",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {label}
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {value}
              </p>
              {subtitle && (
                <p className="text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
              {trend && (
                <div className="flex items-center gap-1 text-xs">
                  <span className={cn(
                    "font-medium",
                    trend.isPositive ? "text-success" : "text-destructive"
                  )}>
                    {trend.isPositive ? "↗" : "↘"} {trend.value}
                  </span>
                  <span className="text-muted-foreground">from last period</span>
                </div>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-3 rounded-xl bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

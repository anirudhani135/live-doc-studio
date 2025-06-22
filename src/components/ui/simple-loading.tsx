
import React from 'react';
import { cn } from "@/lib/utils";

interface SimpleLoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8"
};

export function SimpleLoading({ size = "md", className, text }: SimpleLoadingProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="text-center">
        <div
          className={cn(
            "inline-block border-2 border-current border-t-transparent rounded-full animate-spin",
            sizeClasses[size],
            "text-primary"
          )}
        />
        {text && <p className="text-muted-foreground mt-2">{text}</p>}
      </div>
    </div>
  );
}

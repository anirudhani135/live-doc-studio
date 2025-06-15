
import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  hover: {
    y: -4,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  tap: { scale: 0.98 }
};

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    variant?: "default" | "interactive" | "floating" | "bordered";
    animateOnHover?: boolean;
  }
>(({ className, variant = "default", animateOnHover = true, children, ...props }, ref) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm";
  
  const variantClasses = {
    default: "",
    interactive: "cursor-pointer hover:border-primary/50 transition-colors",
    floating: "shadow-lg hover:shadow-xl",
    bordered: "border-2 hover:border-primary/50"
  };

  return (
    <motion.div
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={animateOnHover ? "hover" : undefined}
      whileTap={variant === "interactive" ? "tap" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
});

EnhancedCard.displayName = "EnhancedCard";

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
EnhancedCardHeader.displayName = "EnhancedCardHeader";

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
EnhancedCardTitle.displayName = "EnhancedCardTitle";

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
EnhancedCardDescription.displayName = "EnhancedCardDescription";

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
EnhancedCardContent.displayName = "EnhancedCardContent";

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
EnhancedCardFooter.displayName = "EnhancedCardFooter";

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardFooter,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
};

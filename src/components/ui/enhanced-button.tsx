
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25",
        floating: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      effect: {
        none: "",
        ripple: "after:absolute after:inset-0 after:bg-white/20 after:rounded-full after:scale-0 hover:after:scale-100 after:transition-transform after:duration-300",
        shine: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        glow: "hover:shadow-2xl hover:shadow-primary/50 transition-shadow duration-300"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      effect: "none"
    },
  }
);

// Narrow the prop types for asChild Slot case to React.ButtonHTMLAttributes
type AsChildButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children: React.ReactNode;
  };

export interface EnhancedButtonProps
  extends Omit<HTMLMotionProps<"button">, "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Only passes safe button props (removing Framer Motion props)
 * to the Slot for asChild scenario. This avoids TS errors and runtime issues.
 */
function filterButtonDOMProps(
  props: EnhancedButtonProps
): AsChildButtonProps {
  // Pick only the props from EnhancedButtonProps that are part of standard button HTML attributes
  const {
    type,
    disabled,
    tabIndex,
    id,
    name,
    value,
    autoFocus,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onContextMenu,
    onPointerDown,
    onPointerUp,
    onPointerEnter,
    onPointerLeave,
    style,
    className,
    children,
    variant,
    size,
    effect,
    asChild,
    ...rest
  } = props;
  // Only pass known "button" props and shadcn variant/size/effect
  return {
    type,
    disabled,
    tabIndex,
    id,
    name,
    value,
    autoFocus,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onContextMenu,
    onPointerDown,
    onPointerUp,
    onPointerEnter,
    onPointerLeave,
    style,
    className,
    children,
    variant,
    size,
    effect,
    asChild,
    // Don't spread ...rest (so no animation props like whileHover etc)
  };
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, effect, asChild = false, children, ...props }, ref) => {
    const buttonMotionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring" as const, stiffness: 400, damping: 30 }
    };

    if (asChild) {
      // Pass only safe button props and not the Framer Motion props
      const slotProps = filterButtonDOMProps({
        className,
        variant,
        size,
        effect,
        asChild,
        children,
        ...props,
      });
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, effect, className }))}
          ref={ref}
          {...slotProps}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, effect, className }))}
        ref={ref}
        {...buttonMotionProps}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton, buttonVariants };

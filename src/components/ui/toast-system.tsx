
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast as sonnerToast } from "sonner";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const toastStyles = {
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  info: "border-blue-200 bg-blue-50 text-blue-900"
};

const iconStyles = {
  success: "text-green-500",
  error: "text-red-500", 
  warning: "text-yellow-500",
  info: "text-blue-500"
};

export function Toast({ id, type, title, description, action, onDismiss }: ToastProps) {
  const Icon = toastIcons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative rounded-lg border p-4 shadow-lg backdrop-blur-sm",
        toastStyles[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconStyles[type])} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-sm">{title}</h4>
            <button
              onClick={() => onDismiss(id)}
              className="text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm font-medium underline mt-2 hover:no-underline"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced toast functions that work with the existing sonner system
export const enhancedToast = {
  success: (title: string, description?: string) => {
    sonnerToast.success(title, {
      description,
      duration: 4000,
    });
  },
  
  error: (title: string, description?: string, action?: { label: string; onClick: () => void }) => {
    sonnerToast.error(title, {
      description,
      duration: 6000,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    });
  },
  
  warning: (title: string, description?: string) => {
    sonnerToast.warning(title, {
      description,
      duration: 5000,
    });
  },
  
  info: (title: string, description?: string) => {
    sonnerToast.info(title, {
      description,
      duration: 4000,
    });
  },
  
  loading: (title: string) => {
    return sonnerToast.loading(title);
  },
  
  promise: function<T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return sonnerToast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
    });
  }
};

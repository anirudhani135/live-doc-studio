
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 20,
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4
};

const staggerContainer = {
  initial: { opacity: 0 },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="in"
          exit="out"
          transition={{
            staggerChildren: 0.1,
            delayChildren: 0.2
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export const StaggerItem = motion.div;

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0
  },
  out: { 
    opacity: 0, 
    y: -20
  }
};

export const staggerItemTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30
};

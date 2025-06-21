
import React, { useState, useRef, useEffect } from 'react';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * Lazy loading wrapper component for performance optimization
 * Only renders children when they come into view
 */
const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback = <div className="animate-pulse bg-muted h-32 rounded" />,
  rootMargin = '50px',
  threshold = 0.1,
  once = true
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && once) {
          setHasBeenInView(true);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold, once]);

  const shouldRender = once ? hasBeenInView : isInView;

  return (
    <div ref={elementRef}>
      {shouldRender ? children : fallback}
    </div>
  );
};

export default LazyLoadWrapper;

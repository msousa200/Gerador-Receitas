"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right";
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({ 
  children, 
  animation = "slide-up", 
  delay = 0,
  className = ""
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const animationClass = {
    "fade": "animate-fade-in",
    "slide-up": "animate-slide-up",
    "slide-left": "animate-slide-in-left",
    "slide-right": "animate-slide-in-right"
  }[animation];

  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <div 
      ref={elementRef} 
      className={`scroll-animation ${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}

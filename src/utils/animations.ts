import { Variants } from "motion/react";

export const fadeUpVariant: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const slideInVariant = (direction: "left" | "right" | "up" | "down", delay: number = 0): Variants => ({
  initial: { 
    opacity: 0, 
    x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } 
  }
});

export const scaleInVariant: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6 } 
  }
};

export const hoverScaleVariant = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

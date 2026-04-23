import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";

interface HeroCardProps {
  language: string;
  t: (key: string) => string;
}

export function HeroCard({ language, t }: HeroCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState(1);
  const flipCount = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [15, -15]), {
    stiffness: 150, damping: 20, mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), {
    stiffness: 150, damping: 20, mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const handleMouseEnterCard = useCallback(() => {
    setIsHovered(true);
    setTimeout(() => {
      flipCount.current += 1;
      setFlipDirection(flipCount.current % 2 === 0 ? 1 : -1);
      setIsFlipped(true);
    }, 200);
  }, []);

  const handleMouseLeaveCard = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsFlipped(false);
  }, [mouseX, mouseY]);

  const flipAngle = isFlipped ? 180 * flipDirection : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative flex items-center justify-center w-full"
      style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 blur-[80px] rounded-full z-0 pointer-events-none"
      />

      <div
        className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] aspect-[1.44/1] sm:aspect-[1.586/1] z-10 cursor-pointer"
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          animate={{
            y: isHovered ? 30 : 15,
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 0.95 : 1
          }}
          className="absolute inset-0 bg-black blur-2xl rounded-3xl transform translate-y-12"
        />

        <motion.div
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
          className="w-full h-full"
        >
          <motion.div
            animate={{ rotateY: flipAngle }}
            transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
            style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", willChange: "transform" }}
            className="relative w-full h-full"
          >
            <CardFront 
              language={language} 
              t={t} 
              isFlipped={isFlipped} 
              pointerX={pointerX} 
              pointerY={pointerY} 
            />
            <CardBack 
              language={language} 
              t={t} 
              isFlipped={isFlipped} 
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

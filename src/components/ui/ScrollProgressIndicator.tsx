"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const ScrollProgressIndicator = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress for that premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate the position of the glowing dot
  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle dragging the scrollbar
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const relativeY = moveEvent.clientY - rect.top;
      const scrollPercentage = Math.max(0, Math.min(1, relativeY / rect.height));
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, scrollHeight * scrollPercentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-[10px] z-[9999] hidden lg:block group cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      {/* The Scroll Track */}
      <div 
        ref={trackRef}
        className="absolute inset-0 bg-white border-l border-black/5 transition-colors duration-300 group-hover:bg-gray-50"
      >
        {/* The Inner Progress Bar (Active) */}
        <motion.div
          style={{ 
            scaleY: smoothProgress, 
            originY: 0,
          }}
          className="absolute inset-0 w-full bg-gradient-to-b from-[#3666ff] via-[#4A6FFF] to-[#3666ff] opacity-90 shadow-[0_0_10px_rgba(54,102,255,0.2)] rounded-b-full"
        />

        {/* The Glowing Lead Dot (from user image) */}
        <motion.div
          style={{ top: dotY }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 z-10"
        >
          {/* The White Dot */}
          <div className="w-[6px] h-[6px] bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1),0_0_20px_#3666ff] relative z-20 mx-auto" />
          
          {/* The Blue Glow Aura */}
          <div className="absolute inset-0 bg-[#3666ff] rounded-full blur-[6px] opacity-70 animate-pulse" />
        </motion.div>
      </div>

      {/* Hover Overlay for better target area */}
      <div className="absolute inset-y-0 right-0 w-4 bg-transparent" />
    </div>
  );
};

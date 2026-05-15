"use client";
 
import * as React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
 
type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};
 
export const InfiniteTextMarquee: React.FC<InfiniteTextMarqueeProps> = ({
  text = "Let's Get Started",
  link = "/components",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex💪",
  fontSize = "8rem",
  textColor = "", // optional override
  hoverColor = "", // optional override
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;
 
  useEffect(() => {
    if (!showTooltip) return;
 
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
 
      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rotation = (distanceFromMidpoint / midpoint) * maxRotation;
 
      setRotation(e.clientX > midpoint ? rotation : -rotation);
    };
 
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);
 
  const repeatedText = Array(10).fill(text).join(" - ") + " -";
 
  return (
    <>
      {showTooltip && (
        <div
          className={`following-tooltip fixed z-[99] transition-opacity duration-300 font-bold px-10 py-5 rounded-full text-nowrap
            ${isHovered ? "opacity-100" : "opacity-0"}
            bg-slate-900/90 backdrop-blur-md text-white border border-white/10 shadow-2xl pointer-events-none
          `}
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
          }}
        >
          <p className="text-sm uppercase tracking-widest">{tooltipText}</p>
        </div>
      )}
 
      <main className="relative w-vw overflow-hidden">
        <motion.div
          className="whitespace-nowrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            x: [0, -1000],
            transition: {
              repeat: Infinity,
              duration: speed,
              ease: "linear",
            },
          }}
        >
          <Link href={link}>
            <span
              className={`cursor-pointer font-bold tracking-tight py-10 m-0 transition-all ${
                textColor ? "" : "text-slate-900/10 hover:text-slate-900 transition-colors duration-500"
              }`}
              style={{
                fontSize: `clamp(4rem, 15vw, ${fontSize})`,
              }}
            >
              <span className="hoverable-text">{repeatedText}</span>
            </span>
          </Link>
        </motion.div>
      </main>
    </>
  );
};

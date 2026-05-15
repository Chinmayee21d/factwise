"use client"

import * as React from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardStickyProps {
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = ({
  index,
  progress,
  range,
  targetScale,
  children,
  className,
  style,
}: CardStickyProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center h-screen"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 20 + 150}px)`, // Adjusted base offset for your layout
          ...style,
        }}
        className={cn(
          "relative origin-top flex flex-col overflow-hidden",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }

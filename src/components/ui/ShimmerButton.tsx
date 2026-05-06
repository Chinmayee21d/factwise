'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  icon?: React.ReactNode;
}

export const ShimmerButton = ({ 
  children, 
  className, 
  variant = 'primary', 
  showArrow = false,
  icon,
  ...props 
}: ShimmerButtonProps) => {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-[20px] px-8 py-3.5 text-[14px] font-medium transition-all duration-300",
        "border active:scale-95 flex items-center justify-center gap-2.5 h-[52px]",
        variant === 'primary'
          ? "bg-[#3666ff] text-white border-[#3666ff]/20"
          : "bg-black/[0.03] text-[#808080] border-black/[0.08] hover:bg-black/[0.06] hover:border-black/15 hover:text-[#000000]",
        className
      )}
      {...props}
    >
      {/* The Gradient Slide Effect */}
      <div className={cn(
        "absolute inset-0 w-0 transition-all duration-500 ease-out group-hover:w-full z-0",
        variant === 'primary'
          ? "bg-gradient-to-r from-[#49ccf9] to-[#3666ff]"
          : "bg-black/[0.06]"
      )} />
      
      {/* Label - Needs to stay above the gradient */}
      <span className={cn(
        "relative z-10 transition-colors duration-300 flex items-center gap-2",
        variant === 'primary' ? "group-hover:text-white" : ""
      )}>
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        {showArrow && (
          <ArrowRight 
            size={16} 
            className={cn(
              "transition-all duration-300",
              variant === 'secondary' ? "opacity-20 group-hover:opacity-100 group-hover:translate-x-1" : "group-hover:translate-x-1"
            )} 
          />
        )}
      </span>
    </button>
  );
};

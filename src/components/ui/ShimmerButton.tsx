'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ShimmerButton = ({ children, className, variant = 'primary', ...props }: ShimmerButtonProps) => {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full px-8 py-3 text-sm font-medium transition-all duration-300",
        "border border-white/10 active:scale-95",
        variant === 'primary' ? "bg-white text-black" : "bg-transparent text-white",
        className
      )}
      {...props}
    >
      {/* The Gradient Slide Effect */}
      <div className={cn(
        "absolute inset-0 w-0 transition-all duration-500 ease-out group-hover:w-full z-0",
        variant === 'primary' 
          ? "bg-gradient-to-r from-[#7c5cfc] to-[#34d399]" 
          : "bg-white/10"
      )} />
      
      {/* Label - Needs to stay above the gradient */}
      <span className={cn(
        "relative z-10 transition-colors duration-300",
        variant === 'primary' ? "group-hover:text-white" : "group-hover:text-white"
      )}>
        {children}
      </span>
    </button>
  );
};

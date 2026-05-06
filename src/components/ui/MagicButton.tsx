'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label1?: string;
  label2?: string;
  className?: string;
}

export const MagicButton = ({
  label1 = "Request Demo",
  label2 = "Starting Now...",
  className,
  ...props
}: MagicButtonProps) => {
  return (
    <div className={cn("btn-wrapper", className)}>
      <style jsx>{`
        .btn-wrapper {
          position: relative;
          display: inline-block;
        }

        .btn {
          --border-radius: 20px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: #3666ff;
          --highlight-color-hue: 218deg; /* FactWise Blue */

          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.8em 1.4em 0.8em 1.2em;
          font-family: "Inter", sans-serif;
          font-size: 15px;
          font-weight: 500;
          background-color: var(--button-color);
          position: relative;
          z-index: 1;

          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.15),
            inset 0px 2px 2px rgba(255, 255, 255, 0.08),
            0px 4px 20px rgba(54, 102, 255, 0.3);

          border: solid 1px rgba(255, 255, 255, 0.2);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all var(--transition);
          color: white;
          overflow: hidden;
        }

        .btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          z-index: -1;
          transition: all var(--transition);
          box-shadow:
            0 -8px 8px -6px rgba(73, 204, 249, 0) inset,
            1px 1px 1px rgba(255, 255, 255, 0.1);
        }

        .btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 100%, 70%),
            hsla(var(--highlight-color-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        .btn-letter {
          position: relative;
          display: inline-block;
          color: rgba(255, 255, 255, 0.75);
          animation: letter-anim 2.5s ease-in-out infinite;
          transition: all var(--transition);
        }

        @keyframes letter-anim {
          50% {
            text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
            color: #fff;
          }
        }

        .btn-svg {
          height: 20px;
          width: 20px;
          margin-right: 0.75rem;
          fill: #ffffff;
          animation: flicker 3s linear infinite;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
          transition: all var(--transition);
        }

        @keyframes flicker {
          50% { opacity: 0.6; }
        }

        .txt-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 100px;
        }

        .txt-1, .txt-2 {
          position: absolute;
          white-space: nowrap;
          transition: all 0.4s ease;
        }

        .txt-2 {
          opacity: 0;
          transform: translateY(10px);
        }

        .btn:hover .txt-1 {
          opacity: 0;
          transform: translateY(-10px);
        }

        .btn:hover .txt-2 {
          opacity: 1;
          transform: translateY(0);
        }

        .btn:hover .btn-letter {
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }

        .btn:hover .btn-svg {
          fill: #fff;
          filter: drop-shadow(0 0 8px #49ccf9);
          transform: scale(1.1) rotate(10deg);
        }

        .btn:hover::before {
          box-shadow:
            0 -12px 12px -6px rgba(73, 204, 249, 0.4) inset,
            0 0 20px rgba(73, 204, 249, 0.2);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .btn:active {
          transform: scale(0.96);
          background-color: #2a55ee;
        }

        /* Staggered animation delays */
        ${label1.split('').map((_, i) => `
          .txt-1 .btn-letter:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; }
        `).join('')}
        ${label2.split('').map((_, i) => `
          .txt-2 .btn-letter:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; }
        `).join('')}
      `}</style>

      <button className="btn" {...props}>
        <svg className="btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
        <div className="txt-wrapper">
          <div className="txt-1">
            {label1.split('').map((char, i) => (
              <span key={i} className="btn-letter">{char === ' ' ? ' ' : char}</span>
            ))}
          </div>
          <div className="txt-2">
            {label2.split('').map((char, i) => (
              <span key={i} className="btn-letter">{char === ' ' ? ' ' : char}</span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

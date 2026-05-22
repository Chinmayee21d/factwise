'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type CursorPose = {
    x: number; // % of parent
    y: number; // % of parent
    click?: boolean;
    label?: string | null;
    labelDir?: 'br' | 'bl' | 'tr' | 'tl';
};

/* Animated mouse cursor — drop inside a position:relative parent.
   Coordinates are % of that parent's box. */
export function FwCursor({ pose }: { pose: CursorPose }) {
    const { x, y, click, label, labelDir = 'br' } = pose;

    const labelOffset: React.CSSProperties =
        labelDir === 'br' ? { left: 18, top: 14 } :
        labelDir === 'bl' ? { right: 18, top: 14 } :
        labelDir === 'tr' ? { left: 18, bottom: 14 } :
                            { right: 18, bottom: 14 };

    return (
        <motion.div
            animate={{
                left: `${x}%`,
                top: `${y}%`,
                scale: click ? 0.85 : 1,
            }}
            transition={{
                left:  { type: 'spring', stiffness: 140, damping: 22, mass: 0.6 },
                top:   { type: 'spring', stiffness: 140, damping: 22, mass: 0.6 },
                scale: { duration: 0.12 },
            }}
            style={{
                position: 'absolute',
                zIndex: 40,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 4px 8px rgba(15,23,42,0.18))',
            }}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                <path
                    d="M5 3 L5 19 L9 15 L11.5 21 L14 20 L11.5 14 L17 14 Z"
                    fill="#0D1117" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"
                />
            </svg>

            {/* Click ripple */}
            {click && (
                <motion.span
                    key={`${x}-${y}`}
                    initial={{ opacity: 0.6, scale: 0.4 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        left: -4, top: -4,
                        width: 24, height: 24,
                        borderRadius: '50%',
                        border: '2px solid rgba(54,102,255,0.55)',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {label && (
                <span
                    style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        fontWeight: 700,
                        color: '#0D1117',
                        background: '#fff',
                        border: '1px solid rgba(54,102,255,0.25)',
                        boxShadow: '0 4px 14px rgba(15,23,42,0.1)',
                        padding: '3px 7px',
                        borderRadius: 6,
                        ...labelOffset,
                    }}
                >
                    {label}
                </span>
            )}
        </motion.div>
    );
}

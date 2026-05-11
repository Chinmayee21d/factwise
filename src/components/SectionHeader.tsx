'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  accentColor?: string;
  align?: 'left' | 'center';
  marginBottom?: number | string;
}

export default function SectionHeader({
  label,
  title,
  description,
  accentColor = '#3666ff',
  align = 'left',
  marginBottom = 64,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div style={{
      marginBottom: marginBottom,
      textAlign: isCenter ? 'center' : 'left',
      display: 'flex',
      flexDirection: 'column',
      alignItems: isCenter ? 'center' : 'flex-start'
    }}>
      {/* Label/Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-badge"
      >
        {label}
      </motion.div>


      {/* Title */}
      <motion.h2
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontSize: 'clamp(32px, 5vw, 54px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#1A1D2E',
          lineHeight: 1.15,
          margin: '0 0 16px 0',
          maxWidth: 800,
        }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#7B82A8',
            maxWidth: 720,
            lineHeight: 1.6,
            margin: 0
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

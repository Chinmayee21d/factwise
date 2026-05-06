'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  accentColor?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  label,
  title,
  description,
  accentColor = '#3666ff',
  align = 'left',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div style={{
      marginBottom: 64,
      textAlign: isCenter ? 'center' : 'left',
      display: 'flex',
      flexDirection: 'column',
      alignItems: isCenter ? 'center' : 'flex-start'
    }}>
      {/* Label and Pulse */}
      <motion.div
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
      >
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 10px ${accentColor}`,
        }} />
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.2em'
        }}>
          {label}
        </span>
      </motion.div>


      {/* Title */}
      <motion.h2
        style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 300,
          letterSpacing: '-0.025em',
          color: '#000000',
          lineHeight: 1.08,
          marginBottom: 16,
          maxWidth: 800,
        }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          style={{
            fontSize: 16,
            color: '#808080',
            maxWidth: 540,
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

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
  accentColor = '#7c5cfc',
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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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
          fontWeight: 500, 
          color: accentColor, 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em' 
        }}>
          {label}
        </span>
      </motion.div>


      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: '#f4f4f5',
          lineHeight: 1.1,
          marginBottom: 16,
          maxWidth: 800,
        }}
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 16, 
            color: '#6b6b7a', 
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

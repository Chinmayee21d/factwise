'use client';

/**
 * Global Layout Configuration
 * Defines the standard constraints for all landing page sections.
 */
export const GLOBAL_LAYOUT = {
  maxWidth: 1400,
  paddingX: '40px',
  paddingY: '110px',
  gap: 80,
  
  /**
   * Helper to generate standardized container styles
   * Usage: <div style={GLOBAL_LAYOUT.containerStyle}>
   */
  get containerStyle() {
    return {
      maxWidth: this.maxWidth,
      margin: '0 auto',
      paddingLeft: this.paddingX,
      paddingRight: this.paddingX,
    };
  },

  /**
   * Section wrapper style for consistent vertical spacing
   */
  get sectionStyle() {
    return {
      position: 'relative' as const,
      width: '100%',
      paddingTop: this.paddingY,
      paddingBottom: this.paddingY,
    };
  }
};

/**
 * Standardized Section Wrapper Component
 * Use this to wrap any landing page section for automatic alignment.
 */
export function SectionContainer({ 
  children, 
  id, 
  style, 
  innerStyle,
  fullWidth = false 
}: { 
  children: React.ReactNode; 
  id?: string; 
  style?: React.CSSProperties; 
  innerStyle?: React.CSSProperties;
  fullWidth?: boolean;
}) {
  return (
    <section id={id} style={{ ...GLOBAL_LAYOUT.sectionStyle, ...style }}>
      <div style={{ 
        ...(fullWidth ? { width: '100%' } : GLOBAL_LAYOUT.containerStyle), 
        ...innerStyle 
      }}>
        {children}
      </div>
    </section>
  );
}

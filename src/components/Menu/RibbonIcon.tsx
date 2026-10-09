/* src/components/Menu/RibbonIcon.tsx */
import React from 'react';
import { motion } from 'motion/react';

interface RibbonIconProps {
  isOpen: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const RibbonIcon: React.FC<RibbonIconProps> = ({
  isOpen,
  width = 42,
  height = 50,
  className,
}) => {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ scale: isOpen ? 1.08 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Bookmark Ribbon Body - Uses red variable fallback */}
      <motion.path
        d="M4 2 C4 0.89543 4.89543 0 6 0 H18 C19.1046 0 20 0.89543 20 2 V28 L12 22 L4 28 V2 Z"
        fill={isOpen ? 'var(--ribbon-accent, #e53935)' : 'var(--ribbon-color, #c62828)'}
        transition={{ duration: 0.25 }}
      />
    </motion.svg>
  );
};
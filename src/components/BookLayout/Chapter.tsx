/* src/components/BookLayout/Chapter.tsx */
import React from 'react';
import styles from './BookLayout.module.css';

interface ChapterProps {
  id: string;
  bgColor?: string;
  children: React.ReactNode;
  className?: string;
}

export const Chapter: React.FC<ChapterProps> = ({
  id,
  bgColor = '#202020',
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      data-bg={bgColor}
      className={`${styles.chapter} ${className}`}
    >
      {children}
    </section>
  );
};
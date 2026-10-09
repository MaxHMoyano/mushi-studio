/* src/components/HeaderLogo/HeaderLogo.tsx */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './HeaderLogo.module.css';

import logoUrl from '../../assets/logo.png';

export interface ChapterMeta {
  id: string;
  label: string;
}

interface HeaderLogoProps {
  heroId?: string;
  chapters?: ChapterMeta[];
  containerSelector?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  heroId = 'hero',
  chapters = [],
  containerSelector = '[class*="bookContainer"]',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeChapterLabel, setActiveChapterLabel] = useState<string>('');

  // 1. Direct scroll height listener (Triggers as soon as user starts scrolling down)
  useEffect(() => {
    const scrollContainer = document.querySelector(containerSelector) || window;

    const handleScroll = () => {
      const scrollTop =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.scrollTop
          : window.scrollY;

      // Appears after scrolling just 100px down past top hero area
      setIsVisible(scrollTop > 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [containerSelector]);

  // 2. Active Chapter Observer inside the custom scroll container
  useEffect(() => {
    if (!chapters.length) return;

    const scrollContainer = document.querySelector(containerSelector);

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = chapters.find((ch) => ch.id === entry.target.id);
            if (match) {
              setActiveChapterLabel(match.label);
            }
          }
        });
      },
      {
        root: scrollContainer || null, // Sets custom scroll parent as observer root
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0,
      }
    );

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) chapterObserver.observe(el);
    });

    return () => chapterObserver.disconnect();
  }, [chapters, containerSelector]);

  const handleLogoClick = () => {
    const heroElement = document.getElementById(heroId);
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      const scrollContainer = document.querySelector(containerSelector);
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.container}
          onClick={handleLogoClick}
          aria-label="Return to top"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.96 }}
        >
          <img src={logoUrl} alt="Mushi Studio Logo" className={styles.logoImage} />
          <span className={styles.brandName}>mushi</span>

          {activeChapterLabel && (
            <>
              <span className={styles.divider}>/</span>
              <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeChapterLabel}
                    className={styles.chapterTitle}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {activeChapterLabel}
                  </motion.span>
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};
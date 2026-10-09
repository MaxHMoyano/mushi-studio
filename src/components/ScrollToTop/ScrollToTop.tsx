/* src/components/ScrollToTop/ScrollToTop.tsx */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ScrollToTop.module.css';

interface ScrollToTopProps {
  heroId?: string;
  containerSelector?: string; // CSS selector for the scroll container
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  heroId = 'hero',
  containerSelector = '[class*="bookContainer"]',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(containerSelector) || window;

    // Direct scroll height detection handles custom scroll containers 100% reliably
    const handleScroll = () => {
      const scrollTop =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.scrollTop
          : window.scrollY;

      // Show button only after scrolling past 300px
      setIsVisible(scrollTop > 300);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [containerSelector]);

  const scrollToTop = () => {
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
          className={styles.button}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
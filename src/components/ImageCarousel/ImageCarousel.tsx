/* src/components/Carousel/ImageCarousel.tsx */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ImageCarousel.module.css';

export interface CarouselSlide {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: (string | CarouselSlide)[];
  autoPlayInterval?: number; // In milliseconds (default: 4000ms). Set to 0 to disable.
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlayInterval = 4000,
  showArrows = false,
  showDots = false,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Standardize inputs whether passed as string URLs or object objects
  const slides: CarouselSlide[] = images.map((img) =>
    typeof img === 'string' ? { src: img } : img
  );

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Handle Auto-Play timer & Pause on Hover
  useEffect(() => {
    if (autoPlayInterval <= 0 || total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, total, isPaused, nextSlide]);

  if (total === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={`${styles.carouselContainer} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade-In / Fade-Out Motion Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentSlide.src}
          alt={currentSlide.alt || `Slide ${currentIndex + 1}`}
          className={styles.slideImage}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      {/* Caption Overlay */}
      {currentSlide.caption && (
        <div className={styles.captionOverlay}>{currentSlide.caption}</div>
      )}

      {/* Navigation Arrows */}
      {showArrows && total > 1 && (
        <>
          <motion.button
            className={`${styles.arrowButton} ${styles.arrowLeft}`}
            onClick={prevSlide}
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <motion.button
            className={`${styles.arrowButton} ${styles.arrowRight}`}
            onClick={nextSlide}
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </>
      )}

      {/* Pill Indicators */}
      {showDots && total > 1 && (
        <div className={styles.dotsContainer}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
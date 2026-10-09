/* src/components/Hero/Hero.tsx */
import { motion } from 'motion/react';
import styles from './Hero.module.css';
import logoUrl from '../../assets/logo.png';
// Default export is required for React.lazy()
export default function Hero() {
  return (
    <section id="hero" className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={logoUrl}
          alt='Mushi studios logo'
          className={styles.logo}
        />
        <h1 className={styles.title}>mushi studio</h1>

        {/* <p className={styles.subtitle}>Design & Motion Lab</p> */}
      </motion.div>
    </section>
  );
}
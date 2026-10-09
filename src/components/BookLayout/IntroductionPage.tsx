/* src/components/BookLayout/IntroductionPage.tsx */
import React from 'react';
import { motion } from 'motion/react';
import styles from './IntroductionPage.module.css';

export interface IntroductionPageProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  children?: React.ReactNode;
}

const DEFAULT_TITLE = 'sobre a MUSHI';
const DEFAULT_DESCRIPTION =
  'É um estúdio criativo independente voltado al desenvolvimento e à produção de projetos audiovisuais e narrativas em diferentes formatos. Contamos histórias que exploram a complexidade de questões sociais e ambientais reais através da ficção, da fantasia sombria e do realismo mágico.';

export const IntroductionPage: React.FC<IntroductionPageProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  logoSrc,
  logoAlt = 'mushi studio logo',
  children,
}) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo slot with clean text fallback */}
        <div className={styles.logoWrapper}>
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt} className={styles.logoImage} />
          ) : (
            <span className={styles.logoPlaceholder}>mushi</span>
          )}
        </div>

        <h1 className={styles.title}>{title}</h1>
        <div className={styles.divider} />
        <p className={styles.description}>{description}</p>

        {children}
      </motion.div>
    </div>
  );
};
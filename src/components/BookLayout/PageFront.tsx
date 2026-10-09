/* src/components/BookLayout/PageFront.tsx */
import React from 'react';
import { motion } from 'motion/react';
import styles from './PageFront.module.css';

export interface PageFrontProps {
    chapterNumber: string; // e.g., "Chapter I" or "01"
    title: string;         // e.g., "Catty Bete"
    description: string;   // Chapter lore/introduction
    children?: React.ReactNode;
}

export const PageFront: React.FC<PageFrontProps> = ({
    chapterNumber,
    title,
    description,
    children,
}) => {
    return (
        <div className={styles.container}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.4 }}
            >
                <span className={styles.chapterNumber}>{chapterNumber}</span>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.divider} />
                <p className={styles.description}>{description}</p>
                {children && <div className={styles.extraContent}>{children}</div>}
            </motion.div>
        </div>
    );
};
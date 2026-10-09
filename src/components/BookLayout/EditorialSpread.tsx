/* src/components/BookLayout/EditorialSpread.tsx */
import React from 'react';
import { motion } from 'motion/react';
import styles from './EditorialSpread.module.css';

export interface EditorialSpreadProps {
    title: string;
    highlight?: string;
    paragraphs?: string[];
    media?: React.ReactNode;
    children?: React.ReactNode;
}

export const EditorialSpread: React.FC<EditorialSpreadProps> = ({
    title,
    highlight,
    paragraphs = [],
    media,
    children,
}) => {
    return (
        <div className={styles.container}>
            {/* Left Column: Title, Highlighted Text & Paragraphs */}
            <motion.div
                className={styles.textColumn}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <h2 className={styles.titleHeader}>{title}</h2>

                {highlight && <p className={styles.highlightText}>{highlight}</p>}

                {paragraphs.length > 0 && (
                    <div className={styles.bodyText}>
                        {paragraphs.map((text, idx) => (
                            <p key={idx} className={styles.paragraph}>
                                {text}
                            </p>
                        ))}
                    </div>
                )}

                {children}
            </motion.div>

            {/* Right Column: Carousel Slot */}
            {media && (
                <motion.div
                    className={styles.mediaColumn}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    {media}
                </motion.div>
            )}
        </div>
    );
};
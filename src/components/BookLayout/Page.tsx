/* src/components/BookLayout/Page.tsx */
import React from 'react';
import styles from './BookLayout.module.css';

export interface PageProps {
    id?: string;
    background?: string;
    layout?: 'split' | 'center' | 'full';
    left?: React.ReactNode;
    right?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export const Page: React.FC<PageProps> = ({
    id,
    background,
    layout = 'center',
    left,
    right,
    children,
    className = '',
}) => {
    const pageStyle = background ? { background } : undefined;

    // Auto-detect layout mode if left & right props are provided
    const activeLayout = left || right ? 'split' : layout;

    return (
        <div id={id} className={`${styles.page} ${className}`} style={pageStyle}>
            {activeLayout === 'split' && (
                <div className={styles.pageSplit}>
                    <div className={styles.leftColumn}>{left}</div>
                    <div className={styles.rightColumn}>{right}</div>
                </div>
            )}

            {activeLayout === 'center' && (
                <div className={styles.pageCenter}>{children}</div>
            )}

            {activeLayout === 'full' && (
                <div className={styles.pageFull}>{children}</div>
            )}
        </div>
    );
};
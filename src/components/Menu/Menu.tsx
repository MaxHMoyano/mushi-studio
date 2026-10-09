/* src/components/Menu/Menu.tsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Menu.module.css';
import { RibbonIcon } from './RibbonIcon';

interface NavItem {
  label: string;
  href: string;
}

const MENU_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Catty Bete', href: '#catty-bete' },
  { label: 'Cemiterio do Guaras', href: '#cemiterio' },
  { label: 'Nosotros', href: '#us' },
];

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={styles.triggerButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {/* Pass state prop to child SVG component */}
        <RibbonIcon isOpen={isOpen} />
      </button>

      {/* Translucent Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          >
            <ul className={styles.navList}>
              {MENU_ITEMS.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    className={styles.navItem}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
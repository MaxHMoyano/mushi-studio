/* src/App.tsx */
import { lazy, Suspense, useEffect, useState } from 'react';
import { Menu } from './components/Menu/Menu';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { HeaderLogo } from './components/HeaderLogo/HeaderLogo';
import { Page, Chapter } from './components/BookLayout';
import { PageFront } from './components/BookLayout/PageFront';
import styles from './components/BookLayout/BookLayout.module.css';
// Images
import mainLogo from './assets/logo2.png'

import photo1 from './assets/catty-bete-bg.jpg';
import photo2 from './assets/catty2.jpg';
import photo3 from './assets/catty3.jpg';

import { ImageCarousel } from './components/ImageCarousel/ImageCarousel';
import { IntroductionPage } from './components/BookLayout/IntroductionPage';
import { EditorialSpread } from './components/BookLayout/EditorialSpread';
// Vite splits Hero + Hero.module.css into a separate async bundle chunk
const Hero = lazy(() => import('./components/Hero/Hero'));

export function App() {
  const [currentBg, setCurrentBg] = useState('#202020');
  const cattyGallery = [photo1, photo2, photo3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bg = entry.target.getAttribute('data-bg');
            if (bg) {
              setCurrentBg(bg);
            }
          }
        });
      },
      {
        /* Triggers right when the chapter enters the center 20% of screen */
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const chapterElements = document.querySelectorAll('[data-bg]');
    chapterElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cattyNarrative = [
    '"Sound"—it is crucial for creating an immersive space—a physical resonance.',
    'However, standard geometry often causes low-frequency flutter, requiring bespoke acoustic diffusion techniques.',
    'During the initial layout phase, the team mapped spatial reflections across three primary axes.',
    'What resulted was a modular architecture that adapts dynamically to ambient light and acoustic feedback throughout the day.'
  ];

  return (
    <main>
      <Menu />
      <ScrollToTop heroId="hero" />
      <HeaderLogo heroId='hero' />
      <Suspense fallback={<div>Loading...</div>}>
        <div
          className={styles.bookContainer}
          style={{ backgroundColor: currentBg }}
        >
          <Chapter id="hero" bgColor="#202020">
            <Hero />
          </Chapter>
          <Chapter bgColor='#202020' id="about">
            <IntroductionPage logoSrc={mainLogo} />
          </Chapter>
          <Chapter bgColor='#2b2b2b' id="catty-bete">
            {/* Page 1: Chapter Front Cover Page */}
            <PageFront
              chapterNumber="Chapter I"
              title="Catty Bete"
              description="A horror story from the past / future"
            />

            {/* Page 2: Front-facing Centered Narrative */}
            <Page layout="full">
              <EditorialSpread
                title="Building Catty Bete"
                highlight="An architectural exploration into acoustic diffusion, geometric light, and physical soundscapes."
                paragraphs={cattyNarrative}
                media={
                  <ImageCarousel
                    images={cattyGallery}
                    autoPlayInterval={4000}
                    showDots={true}
                  />
                }
              />
            </Page>

            {/* Page 3: Two-Column Spread */}
            <Page
              left={
                <div>
                  <h3>Technical Execution</h3>
                  <p>Built with custom shaders and WebGL canvas pipelines.</p>
                </div>
              }
              right={
                <div style={{ background: 'var(--code-bg)', padding: '2rem', borderRadius: '12px' }}>
                  <code>// Interactive demo or graphic preview</code>
                </div>
              }
            />
          </Chapter>
          {/* Chapter 2 */}
          <Chapter id="cemiterio">
            <Page>
              <h2>Cemiterio dos Guaras</h2>
            </Page>
          </Chapter>

          {/* Chapter 3 */}
          <Chapter id="us">
            <Page>
              <h2>Nosotros</h2>
            </Page>
          </Chapter>
        </div>
      </Suspense>
    </main>
  );
}
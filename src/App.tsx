import { lazy, Suspense } from 'react';
import { Menu } from './components/Menu/Menu';
// Vite splits Hero + Hero.module.css into a separate async bundle chunk
const Hero = lazy(() => import('./components/Hero/Hero'));

export function App() {
  return (
    <main>
      <Menu />
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
    </main>
  );
}
import { useState, useCallback } from 'react';
import Navigation from './components/layout/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Expertise from './sections/Expertise';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './components/layout/Footer';
import './App.css';

export default function App() {
  const [, setScrollProgress] = useState(0);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  return (
    <div className="app">
      <Navigation />
      <main id="main-content" className="main-content">
        <Hero onScrollProgress={handleScrollProgress} />
        <About />
        <Work />
        <Expertise />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

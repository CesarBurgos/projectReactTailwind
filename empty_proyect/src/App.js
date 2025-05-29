import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// Desktop components
import Inicio from './components/Inicio';

function App() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Cambiado de 768 a 1024
  const sectionsContainerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Cambiado de 768 a 1024
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Añadido para verificar el tamaño inicial
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = sectionsContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return; // Aumentado a 800ms
      
      const deltaY = Math.abs(e.deltaY);
      if (deltaY < 25) return; // Aumentado el umbral mínimo
      
      lastScrollTime.current = now;
      
      const container = sectionsContainerRef.current;
      const sections = Array.from(container.children);
      const currentIndex = sections.findIndex(section => section.id === currentSection);
      
      const nextIndex = e.deltaY > 0 ? 
        Math.min(currentIndex + 1, sections.length - 1) : 
        Math.max(currentIndex - 1, 0);
      
      const targetSection = sections[nextIndex];
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection(targetSection.id);
      }
    };

    const container = sectionsContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  return (
    <Router>
      <div className="App">
        <div 
          className="sections-container" 
          ref={sectionsContainerRef}
          style={{
            // Aseguramos que el contenido no se salga en dispositivos muy pequeños
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        >
        <section id="inicio">        
            <Inicio scrollToSection={scrollToSection} />
        </section>
        </div>
      </div>
    </Router>
  );
}

export default App;

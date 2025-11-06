import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import BackendGuide from './components/BackendGuide';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-background text-text-primary font-sans transition-colors duration-300">
          <Header />
          <main>
            <Hero />
            <Courses />
            <AnimatedSection>
              <Testimonials />
            </AnimatedSection>
            <Booking />
            <AnimatedSection>
                <BackendGuide />
            </AnimatedSection>
            <AnimatedSection>
              <Contact />
            </AnimatedSection>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
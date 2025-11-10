import React from 'react';
import OasisHeader from './oasis/OasisHeader';
import OasisHero from './oasis/OasisHero';
import OasisWelcome from './oasis/OasisWelcome';
import OasisOfferings from './oasis/OasisOfferings';
import OasisServices from './oasis/OasisServices';
import OasisConnect from './oasis/OasisConnect';
import OasisInsights from './oasis/OasisInsights';
import OasisFooter from './oasis/OasisFooter';
import AnimatedSection from './AnimatedSection';


const OasisThemeSite: React.FC = () => (
  <div className="bg-background text-text-primary font-sans transition-colors duration-300 theme-oasis">
    <OasisHeader />
    <main>
        <OasisHero />
        <section id="about-oasis">
            <AnimatedSection>
                <OasisWelcome />
            </AnimatedSection>
        </section>
        <section id="courses-oasis">
            <AnimatedSection>
                <OasisOfferings />
            </AnimatedSection>
        </section>
        <section id="services-oasis">
            <AnimatedSection>
                <OasisServices />
            </AnimatedSection>
        </section>
        <section id="insights-oasis">
            <AnimatedSection>
                <OasisInsights />
            </AnimatedSection>
        </section>
        <section id="contact-oasis">
            <AnimatedSection>
                <OasisConnect />
            </AnimatedSection>
        </section>
    </main>
    <OasisFooter />
  </div>
);

export default OasisThemeSite;
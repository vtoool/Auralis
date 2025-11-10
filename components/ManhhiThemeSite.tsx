import React from 'react';
import ManhhiHeader from './manhhi/ManhhiHeader';
import ManhhiHero from './manhhi/ManhhiHero';
import ManhhiWellBeing from './manhhi/ManhhiWellBeing';
import ManhhiSpiritualGrowth from './manhhi/ManhhiSpiritualGrowth';
import ManhhiMindfulness from './manhhi/ManhhiMindfulness';
import ManhhiConnect from './manhhi/ManhhiConnect';
import ManhhiWisdom from './manhhi/ManhhiWisdom';
import ManhhiFooter from './manhhi/ManhhiFooter';
import AnimatedSection from './AnimatedSection';


const ManhhiThemeSite: React.FC = () => (
  <div className="bg-background text-text-primary font-sans transition-colors duration-300">
    <ManhhiHeader />
    <main>
        <ManhhiHero />
        <AnimatedSection>
            <ManhhiWellBeing />
        </AnimatedSection>
        <AnimatedSection>
            <ManhhiSpiritualGrowth />
        </AnimatedSection>
        <AnimatedSection>
            <ManhhiMindfulness />
        </AnimatedSection>
        <AnimatedSection>
            <ManhhiConnect />
        </AnimatedSection>
        <AnimatedSection>
            <ManhhiWisdom />
        </AnimatedSection>
    </main>
    <ManhhiFooter />
  </div>
);

export default ManhhiThemeSite;
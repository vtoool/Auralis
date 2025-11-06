import React from 'react';
import type { Testimonial } from '../types';
import TestimonialCard from './TestimonialCard';
import { useLanguage } from '../context/LanguageContext';
import { useParallax } from '../hooks/useParallax';
import { UniversalLogoIcon } from './Logo';

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah J.',
    location: 'Austin, TX',
    quote: "The mindfulness course completely changed my perspective. I feel more calm and centered than ever before. Truly life-changing!",
    avatarUrl: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: 2,
    name: 'Michael B.',
    location: 'London, UK',
    quote: "I was skeptical about audio meditations, but the deep sleep track has given me the best rest I've had in years. Highly recommend.",
    avatarUrl: 'https://picsum.photos/100/100?random=21'
  },
  {
    id: 3,
    name: 'Elena R.',
    location: 'Madrid, ES',
    quote: "Auralis is a sanctuary of peace in my busy life. The Chakra Balancing course was insightful and beautifully produced. Thank you!",
    avatarUrl: 'https://picsum.photos/100/100?random=22'
  }
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const parallaxTransform = useParallax(-0.1);
    // TODO: Fetch testimonials from Supabase
  return (
    <section id="testimonials" className="py-24 bg-primary-light relative overflow-hidden">
        <div 
          className="absolute -bottom-20 -right-20 opacity-5 dark:opacity-10 text-primary"
          style={{ transform: parallaxTransform, willChange: 'transform' }}
          aria-hidden="true"
        >
          <div className="w-96 h-96 scale-150">
            <UniversalLogoIcon className="w-full h-full" />
          </div>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary">{t('testimonials.title')}</h2>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
            {mockTestimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
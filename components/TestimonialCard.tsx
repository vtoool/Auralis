

import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <figure className="bg-card-background rounded-xl shadow-lg p-8 md:flex md:space-x-8 items-center">
        <img className="w-24 h-24 rounded-full mx-auto md:mx-0" src={testimonial.avatarUrl} alt={testimonial.name} width="384" height="512" loading="lazy" />
        <div className="pt-6 md:p-0 text-center md:text-left space-y-4">
            <blockquote>
                <p className="text-lg font-medium text-text-primary">
                    “{testimonial.quote}”
                </p>
            </blockquote>
            <figcaption className="font-medium">
                <div className="text-primary">
                    {testimonial.name}
                </div>
                <div className="text-text-secondary">
                    {testimonial.location}
                </div>
            </figcaption>
        </div>
    </figure>
  );
};

export default TestimonialCard;
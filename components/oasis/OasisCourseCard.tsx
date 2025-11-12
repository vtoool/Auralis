

import React from 'react';
import type { Course } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface OasisCourseCardProps {
  course: Course;
}

const OasisCourseCard: React.FC<OasisCourseCardProps> = ({ course }) => {
  const { t } = useLanguage();
  
  const handleBuyNow = () => {
    // TODO: Integrate with Paddle.js using course.paddle_product_id
    alert(`Buying ${course.title}`);
  };

  return (
    <div className="bg-card-background rounded-sm shadow-sm border border-border-color overflow-hidden group transition-all duration-300 hover:shadow-elegant-lg flex flex-col h-full">
      <div className="overflow-hidden h-64">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{course.type}</span>
          <h3 className="text-3xl font-display font-bold text-primary mt-2">{course.title}</h3>
          <p className="text-text-secondary mt-2 mb-4 leading-relaxed">{course.description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-2xl font-bold text-primary">
            <span className="text-base font-normal text-text-secondary mr-1">$</span>
            {course.price}
          </div>
          <button
            onClick={handleBuyNow}
            className="px-6 py-2 text-md font-semibold rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 shadow"
          >
            {t('courses.buyNow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OasisCourseCard;
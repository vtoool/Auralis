import React from 'react';
import type { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useLanguage();
  
  const handleBuyNow = () => {
    // TODO: Integrate with Paddle.js using course.paddle_product_id
    alert(`Buying ${course.title}`);
  };

  return (
    <div className="bg-card-background rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
      <div className="md:w-1/3">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-48 w-full object-cover md:h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div>
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{course.type}</span>
          <h3 className="text-2xl font-serif font-bold text-primary mt-2">{course.title}</h3>
          <p className="text-text-secondary mt-2 mb-4">{course.description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-primary">
            <span className="text-sm font-normal text-text-secondary mr-1">$</span>
            {course.price}
          </div>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 shadow"
          >
            {t('courses.buyNow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
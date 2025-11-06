import React from 'react';
import type { Course } from '../types';
import CourseCard from './CourseCard';
import { useLanguage } from '../context/LanguageContext';

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Foundations of Mindfulness',
    description: 'A comprehensive video series teaching the core principles of mindfulness to reduce stress and cultivate presence.',
    type: 'Video Course',
    price: 49.99,
    imageUrl: 'https://picsum.photos/400/300?random=10',
    duration: '4 Hours',
  },
  {
    id: 2,
    title: 'Morning Gratitude Meditation',
    description: 'Begin each day with a positive and grateful mindset through this beautifully guided audio meditation.',
    type: 'Audio Meditation',
    price: 9.99,
    imageUrl: 'https://picsum.photos/400/300?random=11',
    duration: '15 Mins',
  },
  {
    id: 3,
    title: 'Chakra Balancing for Beginners',
    description: 'An introductory video course to understanding, clearing, and balancing your seven chakras for spiritual well-being.',
    type: 'Video Course',
    price: 69.99,
    imageUrl: 'https://picsum.photos/400/300?random=12',
    duration: '6 Hours',
  },
   {
    id: 4,
    title: 'Deep Sleep Hypnosis',
    description: 'A soothing audio journey designed to help you release the day and drift into a deep, restorative, and peaceful sleep.',
    type: 'Audio Meditation',
    price: 14.99,
    imageUrl: 'https://picsum.photos/400/300?random=13',
    duration: '30 Mins',
  }
];

const Courses: React.FC = () => {
  const { t } = useLanguage();
  // TODO: Replace mockCourses with data fetched from your Supabase backend.
  // Example:
  // const [courses, setCourses] = useState<Course[]>([]);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data, error } = await supabase.from('courses').select('*');
  //     if (data) setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary">{t('courses.title')}</h2>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('courses.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {mockCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
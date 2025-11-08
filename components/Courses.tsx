
import React, { useState, useEffect, useRef } from 'react';
import type { Course } from '../types';
import CourseCard from './CourseCard';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { supabase } from '../src/services/supabaseClient';
import InquiryModal from './InquiryModal';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    React.useEffect(() => {
        const media = window.matchMedia(query);
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
        
        if (media.matches !== matches) {
          setMatches(media.matches);
        }

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query, matches]);

    return matches;
};

const Courses: React.FC = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const hasModalBeenTriggeredRef = useRef(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error: dbError } = await supabase
        .from('courses')
        .select('*')
        .order('id', { ascending: true });

      if (dbError) {
        console.error('Error fetching courses:', dbError.message);
        setError(`Failed to load courses. Please ensure the backend is set up correctly by following the DEVELOPER_GUIDE.md.`);
      } else if (data) {
        setCourses(data as Course[]);
        setError(null);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  // Effect to handle modal trigger
  useEffect(() => {
    if (error || loading) return; // Don't trigger modal if there's an error or still loading

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasModalBeenTriggeredRef.current) {
            return;
          }
          // User has scrolled to the courses section
          // Set a timer to open the modal after a few seconds
          timerRef.current = window.setTimeout(() => {
            setIsModalOpen(true);
            hasModalBeenTriggeredRef.current = true;
          }, 4000); // 4-second delay
        } else {
          // User has scrolled away, clear the timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [error, loading]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-text-secondary">Loading courses...</div>;
    }
    
    if (error) {
       return (
          <div className="text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg max-w-4xl mx-auto">
              <h3 className="font-bold">Error Loading Content</h3>
              <p className="text-sm">{error}</p>
          </div>
       );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {courses.map((course, index) => {
            const delay = isDesktop ? Math.floor(index / 2) * 200 : index * 150;
            return (
              <AnimatedSection key={course.id} delay={delay}>
                <CourseCard course={course} />
              </AnimatedSection>
            );
          })}
        </div>
    );
  };

  return (
    <section id="courses" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">{t('courses.title')}</h2>
            <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('courses.subtitle')}</p>
          </div>
        </AnimatedSection>
        {renderContent()}
      </div>
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courses={courses}
      />
    </section>
  );
};

export default Courses;
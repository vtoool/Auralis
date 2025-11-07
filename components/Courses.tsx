
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching courses:', error);
      } else if (data) {
        setCourses(data as Course[]);
      }
    };
    fetchCourses();
  }, []);

  // Effect to handle modal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // User has scrolled to the courses section
          // Set a timer to open the modal after a few seconds
          timerRef.current = window.setTimeout(() => {
            const hasSeenModal = sessionStorage.getItem('hasSeenInquiryModal');
            if (!hasSeenModal) {
              setIsModalOpen(true);
              sessionStorage.setItem('hasSeenInquiryModal', 'true');
            }
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
  }, []);

  return (
    <section id="courses" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">{t('courses.title')}</h2>
            <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('courses.subtitle')}</p>
          </div>
        </AnimatedSection>
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

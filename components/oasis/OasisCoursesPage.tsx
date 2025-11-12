
import React, { useState, useEffect } from 'react';
import type { Course } from '../../types';
import { supabase } from '../../src/services/supabaseClient';
import AnimatedSection from '../AnimatedSection';
import OasisCourseCard from './OasisCourseCard';
import { useLanguage } from '../../context/LanguageContext';

const OasisCoursesPage: React.FC = () => {
    const { t } = useLanguage();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const { data, error: dbError } = await supabase
                .from('courses')
                .select('*')
                .order('id', { ascending: true });

            if (dbError) {
                console.error('Error fetching courses:', dbError.message);
                setError(`Failed to load courses. Please try again later.`);
            } else if (data) {
                setCourses(data as Course[]);
                setError(null);
            }
            setLoading(false);
        };
        fetchCourses();
    }, []);

    const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.history.back();
    };

    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-text-secondary col-span-full">Loading courses...</div>;
        }

        if (error) {
            return (
                <div className="text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-4 rounded-sm col-span-full">
                    <h3 className="font-bold">An Error Occurred</h3>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }

        return courses.map((course, index) => (
            <AnimatedSection key={course.id} delay={index * 100}>
                <OasisCourseCard course={course} />
            </AnimatedSection>
        ));
    };

    return (
        <div className="pt-16 pb-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <a href="/#" onClick={handleBack} className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span>{t('oasis.navigation.backToHome')}</span>
                    </a>
                </div>

                <AnimatedSection>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-accent font-semibold tracking-wider">{t('header.courses')}</p>
                        <h1 className="font-display text-5xl font-bold text-primary mt-2 mb-4">{t('courses.title')}</h1>
                        <p className="text-text-secondary text-lg">{t('courses.subtitle')}</p>
                    </div>
                </AnimatedSection>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default OasisCoursesPage;

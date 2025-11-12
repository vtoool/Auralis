

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Course } from '../types';
import CourseFormModal from './CourseFormModal';

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        const { data, error: dbError } = await supabase.from('courses').select('*').order('id');
        if (dbError) {
             console.error("Course Management Error:", dbError.message);
             setError(`Failed to load courses: ${dbError.message}`);
        } else if (data) {
            setCourses(data as Course[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleCreate = () => {
        setEditingCourse({});
        setIsModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleDelete = async (courseId: number) => {
        if (window.confirm('Are you sure you want to delete this course? This also deletes associated files and cannot be undone.')) {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const { error: deleteError } = await supabase.from('courses').delete().eq('id', courseId);
            if (deleteError) {
                setError(`Failed to delete course: ${deleteError.message}`);
            } else {
                setSuccess('Course deleted successfully.');
                fetchCourses(); // Refresh the list
            }
            setLoading(false);
        }
    };
    
    const handleSave = async (courseData: Partial<Course>) => {
        setLoading(true);
        setIsModalOpen(false);
        setError(null);
        setSuccess(null);

        // Remove the id from the insert data if it exists
        const { id, ...dataToSave } = courseData;

        const result = id
            ? await supabase.from('courses').update(dataToSave).eq('id', id).select()
            : await supabase.from('courses').insert(dataToSave).select();

        if (result.error) {
            if (result.error.message.includes('schema cache')) {
                 setError(`Failed to save course: Could not find a column. This is usually due to a stale database schema. Please try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) of this page. If the issue persists, please re-run the database setup script from the DEVELOPER_GUIDE.md.`);
            } else {
                setError(`Failed to save course: ${result.error.message}`);
            }
        } else {
            setSuccess(`Course ${id ? 'updated' : 'created'} successfully.`);
            fetchCourses();
        }

        setLoading(false);
        setEditingCourse(null);
    };

    if (loading && !courses.length) return <div>Loading courses...</div>;
    
    return (
        <div className="bg-card-background p-6 rounded-lg shadow-elegant-lg animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary">Manage Courses</h2>
                <button 
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    + Create New Course
                </button>
            </div>
            
            {success && <p className="text-green-600 mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-md">{success}</p>}
            {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4 rounded-lg my-4">
                    <p className="font-bold text-red-800 dark:text-red-200">An Error Occurred</p>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="flex flex-wrap gap-4 items-center justify-between p-4 border border-border-color rounded-lg">
                        <div className="flex items-center space-x-4">
                             <img src={course.imageUrl || 'https://via.placeholder.com/100'} alt={course.title} className="w-16 h-16 object-cover rounded-md" loading="lazy" />
                            <div>
                                <p className="font-bold text-text-primary">{course.title}</p>
                                <p className="text-sm text-text-secondary">{course.type} - ${course.price}</p>
                                {course.file_url ? (
                                    <a href={course.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-500 hover:underline">
                                        Content Uploaded
                                    </a>
                                ) : (
                                    <p className="text-xs text-text-secondary">No content file.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button 
                                onClick={() => handleEdit(course)} 
                                className="px-3 py-1.5 text-sm rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(course.id)} 
                                className="px-3 py-1.5 text-sm rounded-md bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CourseFormModal
                    course={editingCourse}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
export default CourseManagement;
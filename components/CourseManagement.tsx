import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Course } from '../types';

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('courses').select('*').order('id');
        if (data) setCourses(data as Course[]);
        if (error) setError(error.message);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);
    
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, courseId: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(courseId);
        setError(null);
        setSuccess(null);

        const fileExt = file.name.split('.').pop();
        const fileName = `${courseId}-${Date.now()}.${fileExt}`;
        const filePath = `course-media/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('courses')
            .upload(filePath, file);

        if (uploadError) {
            setError(`Upload failed: ${uploadError.message}`);
            setUploading(null);
            return;
        }

        const { data } = supabase.storage
            .from('courses')
            .getPublicUrl(filePath);

        if (!data?.publicUrl) {
            setError('Could not get public URL for the file.');
            setUploading(null);
            return;
        }

        const { error: updateError } = await supabase
            .from('courses')
            .update({ file_url: data.publicUrl })
            .eq('id', courseId);
            
        if (updateError) {
            setError(`Failed to update course: ${updateError.message}`);
        } else {
            setSuccess('File uploaded and linked successfully!');
            await fetchCourses();
        }
        setUploading(null);
    };

    if (loading) return <div>Loading courses...</div>;

    return (
        <div className="bg-card-background p-6 rounded-lg shadow-elegant-lg animate-fade-in">
            <h2 className="text-xl font-semibold text-primary mb-4">Manage Course Files</h2>
            {error && <p className="text-red-500 mb-4 p-3 bg-red-100 rounded-md">{error}</p>}
            {success && <p className="text-green-600 mb-4 p-3 bg-green-100 rounded-md">{success}</p>}
            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course.id} className="flex flex-wrap gap-4 items-center justify-between p-4 border border-border-color rounded-lg">
                        <div>
                            <p className="font-bold text-text-primary">{course.title}</p>
                            {course.file_url ? (
                                <a href={course.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-green-500 hover:underline break-all">
                                    View Uploaded File
                                </a>
                            ) : (
                                <p className="text-sm text-text-secondary">No file uploaded yet.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor={`upload-${course.id}`} className={`cursor-pointer px-4 py-2 text-sm rounded-md transition-colors ${uploading === course.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                                {uploading === course.id ? 'Uploading...' : 'Upload New File'}
                            </label>
                            <input
                                id={`upload-${course.id}`}
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, course.id)}
                                disabled={uploading === course.id}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CourseManagement;


import React, { useState, useEffect } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Course } from '../types';

interface CourseFormModalProps {
    course: Partial<Course> | null;
    onClose: () => void;
    onSave: (courseData: Partial<Course>) => Promise<void>;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({ course, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Course>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [contentFile, setContentFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        const initialData: Partial<Course> = course?.id ? { ...course } : {
            title: '', description: '', type: 'Video Course', price: 0,
            imageUrl: '', duration: '', paddle_product_id: '', file_url: ''
        };
        setFormData(initialData);

        if (course?.imageUrl) setImagePreview(course.imageUrl);
        else setImagePreview(null);
        
        setCoverImageFile(null);
        setContentFile(null);
        setUploadError(null);
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? parseFloat(value) : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };
    
    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setContentFile(file);
    };

    const uploadFile = async (file: File, path: string): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error } = await supabase.storage.from('courses').upload(filePath, file);
        if (error) throw error;
        
        const { data } = supabase.storage.from('courses').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setUploadError(null);
        let updatedData = { ...formData };

        try {
            if (coverImageFile) {
                const imageUrl = await uploadFile(coverImageFile, 'covers');
                updatedData.imageUrl = imageUrl;
            }
            if (contentFile) {
                const fileUrl = await uploadFile(contentFile, 'course-media');
                updatedData.file_url = fileUrl;
            }
            await onSave(updatedData);
        } catch (error: any) {
            console.error("Error saving course:", error);
            setUploadError(`Save failed: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-card-background rounded-xl shadow-elegant-lg w-full max-w-2xl relative transform animate-scale-up max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-border-color sticky top-0 bg-card-background z-10">
                    <h2 className="text-2xl font-bold text-primary">{course?.id ? 'Edit Course' : 'Create New Course'}</h2>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-text-secondary hover:bg-border-color">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="w-full p-2 rounded-md bg-background border border-border-color" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                            <select name="type" value={formData.type || 'Video Course'} onChange={handleChange} className="w-full p-2 rounded-md bg-background border border-border-color">
                                <option>Video Course</option>
                                <option>Audio Meditation</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full p-2 rounded-md bg-background border border-border-color" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Price</label>
                            <input type="number" name="price" value={formData.price || 0} onChange={handleChange} step="0.01" required className="w-full p-2 rounded-md bg-background border border-border-color" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-text-secondary mb-1">Duration (e.g., 4 Hours)</label>
                           <input type="text" name="duration" value={formData.duration || ''} onChange={handleChange} className="w-full p-2 rounded-md bg-background border border-border-color" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Paddle Product ID (Optional)</label>
                        <input type="text" name="paddle_product_id" value={formData.paddle_product_id || ''} onChange={handleChange} className="w-full p-2 rounded-md bg-background border border-border-color" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Cover Image</label>
                            {imagePreview && <img src={imagePreview} alt="Cover preview" className="w-32 h-32 object-cover rounded-md mb-2" />}
                            <input type="file" accept="image/*" onChange={handleCoverImageChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary-light/80" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Course Content File (Video/Audio)</label>
                            {formData.file_url && !contentFile && <p className="text-sm text-green-500 truncate">Current file: <a href={formData.file_url} target="_blank" rel="noopener noreferrer" className="hover:underline">View</a></p>}
                            {contentFile && <p className="text-sm text-text-secondary">New file: {contentFile.name}</p>}
                            <input type="file" onChange={handleContentFileChange} className="mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/80" />
                        </div>
                    </div>

                    {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-md bg-border-color/50 text-text-secondary hover:bg-border-color">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSaving} className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                            {isSaving ? 'Saving...' : 'Save Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseFormModal;

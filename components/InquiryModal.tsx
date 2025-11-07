import React, { useState, useEffect } from 'react';
import type { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, courses }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError(t('booking.formAlert')); // Reusing translation
      return;
    }

    // In a real application, you would save this to a new 'inquiries' table in Supabase
    console.log('Inquiry submitted:', formData);
    setIsSubmitted(true);
    setError('');

    // Reset form after a delay and close modal
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '' });
        onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-card-background rounded-xl shadow-elegant-lg w-full max-w-lg p-8 relative transform transition-all duration-300 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-text-secondary hover:bg-border-color hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">{t('contact.thankYou')}</h2>
            <p className="text-text-secondary">{t('contact.messageSent')}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-serif font-bold text-primary">{t('inquiryModal.title')}</h2>
              <p className="text-text-secondary mt-1">{t('inquiryModal.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={t('booking.yourName')}
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('booking.yourEmail')}
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t('inquiryModal.phonePlaceholder')}
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">{t('inquiryModal.servicePlaceholder')}</option>
                {courses.map(course => (
                  <option key={course.id} value={course.title}>{course.title}</option>
                ))}
                <option value="General Inquiry">{t('inquiryModal.serviceGeneral')}</option>
              </select>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button type="submit" className="w-full p-3 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                {t('inquiryModal.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
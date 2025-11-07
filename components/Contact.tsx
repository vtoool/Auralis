
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-resize the textarea based on its content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
    }
  }, [formData.message]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend service (e.g., Supabase function, Formspark)
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center max-w-2xl">
           <h2 className="text-4xl font-serif font-bold text-primary">{t('contact.thankYou')}</h2>
           <p className="text-lg text-text-secondary mt-2">{t('contact.messageSent')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary">{t('contact.title')}</h2>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">{t('contact.name')}</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                required
                className="w-full p-4 rounded-md bg-card-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">{t('contact.email')}</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email')}
                required
                className="w-full p-4 rounded-md bg-card-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">{t('contact.message')}</label>
              <textarea
                ref={textareaRef}
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                rows={4}
                required
                className="w-full p-4 rounded-md bg-card-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary transition resize-none overflow-hidden"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-4 px-6 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-md"
              >
                {t('contact.sendMessage')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
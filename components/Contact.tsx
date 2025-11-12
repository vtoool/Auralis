import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../src/services/supabaseClient';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Save message to the 'contacts' table in Supabase.
    // The DEVELOPER_GUIDE.md explains how you can set up a webhook
    // to trigger an email notification from this database action.
    const { error } = await supabase.from('contacts').insert([
        { name: formData.name, email: formData.email, message: formData.message }
    ]);

    if (error) {
        console.error('Contact form submission error:', error);
        setSubmitError("Sorry, there was an issue sending your message. Please try again later.");
        setIsSubmitting(false);
    } else {
        setIsSubmitted(true);
        // No need to set isSubmitting to false, as the view will change.
    }
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
              <label htmlFor="contact-name" className="sr-only">{t('contact.name')}</label>
              <input
                type="text"
                name="name"
                id="contact-name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name')}
                required
                className="w-full p-4 rounded-md bg-card-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">{t('contact.email')}</label>
              <input
                type="email"
                name="email"
                id="contact-email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email')}
                required
                className="w-full p-4 rounded-md bg-card-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">{t('contact.message')}</label>
              <textarea
                ref={textareaRef}
                name="message"
                id="contact-message"
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
                disabled={isSubmitting}
                className="w-full py-4 px-6 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-md disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : t('contact.sendMessage')}
              </button>
            </div>
            {submitError && <p className="text-red-500 text-center pt-2">{submitError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
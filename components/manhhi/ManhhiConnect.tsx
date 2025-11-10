import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../src/services/supabaseClient';

const ManhhiConnect: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        const { error } = await supabase.from('contacts').insert([
            { name: formData.name, email: formData.email, message: formData.message }
        ]);

        if (error) {
            setSubmitError("Sorry, there was an issue sending your message.");
            setIsSubmitting(false);
        } else {
            setIsSubmitted(true);
        }
    };
    
    return (
        <section className="py-24 bg-primary-light">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <img src="https://images.unsplash.com/photo-1617953256087-438a2e2d9370?q=80&w=2864&auto=format&fit=crop" alt="Praying hands of a monk" className="w-full h-auto object-cover" />
                    </div>
                    <div className="bg-card-background p-12">
                         <div className="mb-8">
                            <p className="text-accent font-semibold tracking-wider">MARKETING FOR EXCELLENCE</p>
                            <h2 className="font-display text-4xl font-bold text-primary mt-2">Reach Out and Connect</h2>
                         </div>

                         {isSubmitted ? (
                             <div className="text-center py-10">
                                <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
                                <p className="text-text-secondary mt-2">Your message has been sent. We'll be in touch shortly.</p>
                             </div>
                         ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                    <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                </div>
                                <textarea name="message" placeholder="Message" rows={4} value={formData.message} onChange={handleChange} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition"></textarea>
                                
                                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                                <button type="submit" disabled={isSubmitting} className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-60">
                                    {isSubmitting ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                         )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManhhiConnect;

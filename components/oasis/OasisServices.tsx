


import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { HamsaIcon, YogaIcon, MeditationIcon } from './OasisIcons';
import { useLanguage } from '../../context/LanguageContext';
import { TimeSlot, Unavailability } from '../../types';
import { supabase } from '../../src/services/supabaseClient';
import AnimatedSection from '../AnimatedSection';

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, image: string}> = ({icon, title, description, image}) => {
    return (
        <div className="bg-card-background border border-border-color shadow-sm transition-all duration-300 hover:shadow-elegant-lg group overflow-hidden rounded-sm h-full flex flex-col">
            <div className="h-48 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6 text-center flex-grow flex flex-col">
                {icon}
                <h3 className="font-display text-2xl text-primary mt-4 mb-2">{title}</h3>
                <p className="text-text-secondary flex-grow">{description}</p>
            </div>
        </div>
    );
};

const OasisServices: React.FC = () => {
    const { t, locale } = useLanguage();

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [service, setService] = useState('');
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [setupError, setSetupError] = useState<string | null>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fetchUnavailabilities = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('unavailabilities').select('*');
        if (error) {
            console.error("Error fetching unavailabilities:", error.message);
            setSetupError(`Could not load schedule. Please try again later.`);
        } else if (data) {
            setUnavailabilities(data);
            setSetupError(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUnavailabilities();
    }, [fetchUnavailabilities]);

    const timeSlots = useMemo(() => {
        const dayOfWeek = selectedDate.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const startHour = 9;
        const endHour = (dayOfWeek === 5 || dayOfWeek === 6) ? 21 : 16;

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const todaysUnavailabilities = unavailabilities.filter(u => u.unavailable_date === formattedDate);
        const isFullDayBlocked = todaysUnavailabilities.some(u => u.start_time === null);
        if (isFullDayBlocked) return [];

        const timeToMinutes = (timeStr: string): number => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const blockedRanges = todaysUnavailabilities
            .filter(u => u.start_time && u.end_time)
            .map(u => ({
                start: timeToMinutes(u.start_time!),
                end: timeToMinutes(u.end_time!),
            }));

        const slots: TimeSlot[] = [];

        for (let hour = startHour; hour < endHour; hour++) {
            for (const minute of [0, 30]) {
                const slotTime = `${hour}:${minute === 0 ? '00' : '30'}`;
                const slotTimeInMinutes = timeToMinutes(slotTime);
                const isBlockedByOwner = blockedRanges.some(range => slotTimeInMinutes >= range.start && slotTimeInMinutes < range.end);
                slots.push({ time: slotTime, available: !isBlockedByOwner });
            }
        }
        return slots.filter(slot => timeToMinutes(slot.time) < endHour * 60);
    }, [selectedDate, unavailabilities]);

    const daysInMonth = useMemo(() => {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const days = [];
        while (date.getMonth() === selectedDate.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [selectedDate]);

    const firstDayOfMonth = useMemo(() => {
        return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    }, [selectedDate]);

    const changeMonth = (amount: number) => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            if (newDate < new Date(today.getFullYear(), today.getMonth(), 1)) return new Date(today.getFullYear(), today.getMonth(), 1);
            return newDate;
        });
        setSelectedTime(null);
    };

    const handleDayClick = (day: Date) => {
        if (day < today) return;
        setSelectedDate(day);
        setSelectedTime(null);
    }

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !selectedTime || !service) {
            setAlert({ type: 'error', message: t('booking.formAlert') });
            return;
        }

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const { error: appointmentError } = await supabase
            .from('appointments')
            .insert([{ name, email, date: formattedDate, time: selectedTime, service }]);

        if (appointmentError) {
            setAlert({ type: 'error', message: `Booking failed: ${appointmentError.message}` });
            return;
        }

        const getEndTime = (startTime: string): string => {
            const [hours, minutes] = startTime.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            date.setMinutes(date.getMinutes() + 30);
            const endHours = String(date.getHours()).padStart(2, '0');
            const endMinutes = String(date.getMinutes()).padStart(2, '0');
            return `${endHours}:${endMinutes}:00`;
        }

        const endTime = getEndTime(selectedTime);

        const { error: unavailabilityError } = await supabase
            .from('unavailabilities')
            .insert([{
                unavailable_date: formattedDate,
                start_time: `${selectedTime}:00`,
                end_time: endTime,
                reason: `${name}'s appointment`
            }]);

        if (unavailabilityError) {
            console.error(`Critical: Failed to block time for appointment. Details: ${unavailabilityError.message}`);
        }

        const successMessage = t('booking.successAlert', {
            name, date: selectedDate.toLocaleDateString(locale), time: selectedTime, email,
        });
        setAlert({ type: 'success', message: successMessage });
        setName('');
        setEmail('');
        setService('');
        setSelectedTime(null);
        fetchUnavailabilities();
    };

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const serviceCards = [
        {
            icon: <HamsaIcon className="text-accent mx-auto" />,
            title: t('oasis.services.mindfulnessTitle'),
            description: t('oasis.services.mindfulnessText'),
            image: 'https://picsum.photos/seed/mindfulness-workshop/600/400'
        },
        {
            icon: <YogaIcon className="text-accent mx-auto" />,
            title: t('oasis.services.yogaTitle'),
            description: t('oasis.services.yogaText'),
            image: 'https://picsum.photos/seed/yoga-peace/600/400'
        },
        {
            icon: <MeditationIcon className="text-accent mx-auto" />,
            title: t('oasis.services.meditationTitle'),
            description: t('oasis.services.meditationText'),
            image: 'https://picsum.photos/seed/meditation-session/600/400'
        },
    ];

    const renderBookingContent = () => {
        if (loading) {
            return <div className="text-center text-text-secondary p-8 bg-card-background rounded-sm shadow-lg">Loading schedule...</div>;
        }
        if (setupError) {
            return (
                <div className="text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-4 rounded-sm">
                    <h3 className="font-bold">An Error Occurred</h3>
                    <p className="text-sm">{setupError}</p>
                </div>
            );
        }
        return (
            <div className="bg-card-background rounded-sm shadow-lg p-8 grid md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Previous month">&larr;</button>
                        <h3 className="text-lg font-semibold text-primary">
                            {selectedDate.toLocaleString(locale, { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Next month">&rarr;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {dayLabels.map(day => <div key={day} className="font-bold text-text-secondary text-sm">{day}</div>)}
                        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                        {daysInMonth.map(day => {
                            const isToday = day.toDateString() === new Date().toDateString();
                            const isSelected = day.toDateString() === selectedDate.toDateString();
                            const isPast = day < today;
                            return (
                                <button
                                    key={day.toString()}
                                    onClick={() => handleDayClick(day)}
                                    disabled={isPast}
                                    className={`p-2 rounded-full transition-colors duration-200 text-sm ${isPast ? 'text-text-secondary/50 cursor-not-allowed' : isSelected ? 'bg-primary text-primary-foreground font-bold' : isToday ? 'bg-accent text-accent-foreground' : 'hover:bg-primary-light'
                                        }`}
                                >
                                    {day.getDate()}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">
                        {selectedDate.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-6 max-h-48 overflow-y-auto pr-2">
                        {timeSlots.map(slot => (
                            <button
                                key={slot.time}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                className={`p-2 text-sm rounded-md border transition-colors duration-200 ${slot.available ? (selectedTime === slot.time ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent border-border-color hover:bg-primary-light') : 'bg-border-color/10 text-text-secondary/50 border-border-color/20 cursor-not-allowed line-through'
                                    }`}
                            >
                                {slot.time}
                            </button>
                        ))}
                        {timeSlots.length > 0 && !timeSlots.some(s => s.available) && (
                            <p className="col-span-3 text-center text-text-secondary py-4">{t('booking.noTimes')}</p>
                        )}
                        {timeSlots.length === 0 && (
                            <p className="col-span-3 text-center text-text-secondary py-4">{t('booking.noTimes')}</p>
                        )}
                    </div>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" required>
                            <option value="" disabled>Select a service...</option>
                            <option value="Personalized Guidance Session">Personalized Guidance Session</option>
                            <option value={t('oasis.services.mindfulnessTitle')}>{t('oasis.services.mindfulnessTitle')}</option>
                            <option value={t('oasis.services.yogaTitle')}>{t('oasis.services.yogaTitle')}</option>
                            <option value={t('oasis.services.meditationTitle')}>{t('oasis.services.meditationTitle')}</option>
                        </select>
                        <input type="text" placeholder={t('booking.yourName')} value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" required />
                        <input type="email" placeholder={t('booking.yourEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" required />
                        <button type="submit" className="w-full p-3 font-semibold rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300">
                            {t('booking.confirmBooking')}
                        </button>
                    </form>
                </div>
            </div>
        );
    };


    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-accent font-semibold tracking-wider">{t('oasis.services.services')}</p>
                    <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-4">{t('oasis.services.title')}</h2>
                    <p className="text-text-secondary">{t('oasis.services.text')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceCards.map(card => <ServiceCard key={card.title} {...card} />)}
                </div>

                <div className="mt-24">
                    <AnimatedSection>
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl font-display font-bold text-primary">{t('booking.title')}</h2>
                            <p className="text-lg text-text-secondary mt-2">{t('booking.subtitle')}</p>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                         <div className="max-w-4xl mx-auto">
                            {renderBookingContent()}
                            {alert && (
                                <div className={`mt-6 p-4 rounded-sm text-center ${alert.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}`}>
                                    {alert.message}
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default OasisServices;
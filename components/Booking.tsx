

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TimeSlot, Unavailability } from '../types';
import AnimatedSection from './AnimatedSection';
import { supabase } from '../src/services/supabaseClient';

const Booking: React.FC = () => {
  const { t, locale } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupError, setSetupError] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  useEffect(() => {
    const fetchUnavailabilities = async () => {
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
    };
    fetchUnavailabilities();
  }, []);

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

        slots.push({
          time: slotTime,
          available: !isBlockedByOwner,
        });
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
    if (!name || !email || !selectedTime) {
      setAlert({ type: 'error', message: t('booking.formAlert') });
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    const { error } = await supabase
      .from('appointments')
      .insert([{ 
        name, 
        email, 
        date: formattedDate,
        time: selectedTime 
      }]);

    if (error) {
      setAlert({ type: 'error', message: `Booking failed: ${error.message}` });
    } else {
      const successMessage = t('booking.successAlert', {
        name,
        date: selectedDate.toLocaleDateString(locale),
        time: selectedTime,
        email,
      });
      setAlert({ type: 'success', message: successMessage });
      setName('');
      setEmail('');
      setSelectedTime(null);
    }
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-text-secondary p-8 bg-card-background rounded-xl shadow-lg">Loading schedule...</div>;
    }

    if (setupError) {
       return (
          <div className="text-center text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-bold">An Error Occurred</h3>
              <p className="text-sm">{setupError}</p>
          </div>
       );
    }
    
    return (
        <div className="bg-card-background rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
          {/* Calendar */}
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
                    className={`p-2 rounded-full transition-colors duration-200 text-sm ${
                      isPast ? 'text-text-secondary/50 cursor-not-allowed' :
                      isSelected ? 'bg-primary text-primary-foreground font-bold' :
                      isToday ? 'bg-accent text-accent-foreground' : 'hover:bg-primary-light'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time Slots & Form */}
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
                  className={`p-2 text-sm rounded-md border transition-colors duration-200 ${
                    slot.available
                      ? (selectedTime === slot.time
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent border-border-color hover:bg-primary-light')
                      : 'bg-border-color/10 text-text-secondary/50 border-border-color/20 cursor-not-allowed line-through'
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
              <input
                type="text"
                placeholder={t('booking.yourName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <input
                type="email"
                placeholder={t('booking.yourEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <button type="submit" className="w-full p-3 font-semibold rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300">
                {t('booking.confirmBooking')}
              </button>
            </form>
          </div>
        </div>
    );
  };

  return (
    <section id="booking" className="py-20 bg-primary-light">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">{t('booking.title')}</h2>
            <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">{t('booking.subtitle')}</p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            {renderContent()}
            {alert && (
                <div className={`mt-6 p-4 rounded-md text-center ${alert.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}`}>
                    {alert.message}
                </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Booking;
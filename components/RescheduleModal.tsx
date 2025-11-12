import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Appointment, Unavailability, TimeSlot } from '../types';

interface RescheduleModalProps {
    appointment: Appointment;
    onClose: () => void;
    onReschedule: (appointment: Appointment, newDate: Date, newTime: string) => Promise<void>;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onClose, onReschedule }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(appointment.date + 'T00:00:00'));
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        const fetchUnavailabilities = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('unavailabilities').select('*');
            if (error) {
                console.error("Error fetching unavailabilities:", error.message);
            } else if (data) {
                // IMPORTANT: Exclude the unavailability block of the current appointment being rescheduled.
                // This allows the admin to see the original slot as "available" if they want to move the appointment within the same day.
                const filteredData = data.filter(u => 
                    !(u.unavailable_date === appointment.date && u.start_time === `${appointment.time}:00`)
                );
                setUnavailabilities(filteredData);
            }
            setLoading(false);
        };
        fetchUnavailabilities();
    }, [appointment]);

    const timeSlots = useMemo(() => {
        const dayOfWeek = selectedDate.getDay();
        const startHour = 9;
        const endHour = (dayOfWeek === 5 || dayOfWeek === 6) ? 21 : 16; 

        const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        
        const todaysUnavailabilities = unavailabilities.filter(u => u.unavailable_date === formattedDate);
        if (todaysUnavailabilities.some(u => u.start_time === null)) return [];

        const timeToMinutes = (timeStr: string) => {
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
                const slotTime = `${String(hour).padStart(2,'0')}:${minute === 0 ? '00' : '30'}`;
                const slotTimeInMinutes = timeToMinutes(slotTime);
                const isBlocked = blockedRanges.some(range => slotTimeInMinutes >= range.start && slotTimeInMinutes < range.end);
                slots.push({ time: slotTime, available: !isBlocked });
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

    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

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
    
    const handleConfirm = async () => {
        if (!selectedTime) return;
        setIsSaving(true);
        await onReschedule(appointment, selectedDate, selectedTime);
        setIsSaving(false);
    };

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-card-background rounded-xl shadow-elegant-lg w-full max-w-4xl relative transform animate-scale-up max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-border-color sticky top-0 bg-card-background z-10">
                    <h2 className="text-2xl font-bold text-primary">Reschedule Appointment</h2>
                    <p className="text-text-secondary">For: {appointment.name}</p>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-text-secondary hover:bg-border-color">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                
                {loading ? (
                    <div className="p-8 text-center">Loading availability...</div>
                ) : (
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        {/* Calendar */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Previous month">&larr;</button>
                                <h3 className="text-lg font-semibold text-primary">
                                    {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Next month">&rarr;</button>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center">
                                {dayLabels.map(day => <div key={day} className="font-bold text-text-secondary text-sm">{day}</div>)}
                                {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                                {daysInMonth.map(day => {
                                    const isSelected = day.toDateString() === selectedDate.toDateString();
                                    const isPast = day < today;
                                    return (
                                        <button
                                            key={day.toString()}
                                            onClick={() => handleDayClick(day)}
                                            disabled={isPast}
                                            className={`p-2 rounded-full transition-colors duration-200 text-sm ${
                                            isPast ? 'text-text-secondary/50 cursor-not-allowed' :
                                            isSelected ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-primary-light'
                                            }`}
                                        >
                                            {day.getDate()}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div>
                             <h3 className="text-lg font-semibold text-primary mb-4">
                                Select a new time for {selectedDate.toLocaleDateString('default', { weekday: 'long', day: 'numeric' })}
                            </h3>
                            <div className="grid grid-cols-3 gap-2 mb-6 max-h-64 overflow-y-auto pr-2">
                            {timeSlots.map(slot => (
                                <button
                                key={slot.time}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                className={`py-2.5 px-3 text-base rounded-md border transition-colors duration-200 ${
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
                                <p className="col-span-3 text-center text-text-secondary py-4">No available times for this day.</p>
                            )}
                            {timeSlots.length === 0 && (
                                <p className="col-span-3 text-center text-text-secondary py-4">This day is outside working hours.</p>
                            )}
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t border-border-color">
                                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold rounded-md bg-border-color/50 text-text-secondary hover:bg-border-color">
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleConfirm}
                                    disabled={!selectedTime || isSaving} 
                                    className="px-4 py-2 text-sm font-semibold rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Confirm Reschedule'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default RescheduleModal;
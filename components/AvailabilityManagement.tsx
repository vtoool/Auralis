
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Unavailability } from '../types';

const AvailabilityManagement: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [unavailabilities, setUnavailabilities] = useState<Unavailability[]>([]);
    const [isFullDay, setIsFullDay] = useState(false);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [reason, setReason] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [setupError, setSetupError] = useState<string | null>(null);

    const fetchUnavailabilities = useCallback(async () => {
        setPageLoading(true);
        const { data, error } = await supabase.from('unavailabilities').select('*');
        if (error) {
            console.error("Availability Management Error:", error.message);
            setSetupError(`Failed to load schedule: ${error.message}`);
        } else if (data) {
            setUnavailabilities(data);
            setSetupError(null);
        }
        setPageLoading(false);
    }, []);

    useEffect(() => {
        fetchUnavailabilities();
    }, [fetchUnavailabilities]);

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
            return newDate;
        });
    };
    
    const handleAddUnavailability = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFeedback(null);
        
        const { error } = await supabase.from('unavailabilities').insert([{
            unavailable_date: selectedDate.toISOString().split('T')[0],
            start_time: isFullDay ? null : startTime,
            end_time: isFullDay ? null : endTime,
            reason: reason || null,
        }]);

        if (error) {
            setFeedback({ type: 'error', message: `Failed to block time: ${error.message}` });
        } else {
            setFeedback({ type: 'success', message: 'Time blocked successfully!' });
            setReason('');
            fetchUnavailabilities();
        }
        setFormLoading(false);
    };
    
    const handleDeleteUnavailability = async (id: number) => {
        const { error } = await supabase.from('unavailabilities').delete().eq('id', id);
        if (error) {
            setFeedback({ type: 'error', message: `Delete failed: ${error.message}` });
        } else {
            setFeedback({ type: 'success', message: 'Unavailability removed.' });
            fetchUnavailabilities();
        }
    };

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const unavailabilitiesForMonth = unavailabilities.filter(u => 
        new Date(u.unavailable_date + 'T00:00:00').getMonth() === selectedDate.getMonth() &&
        new Date(u.unavailable_date + 'T00:00:00').getFullYear() === selectedDate.getFullYear()
    );

    if (pageLoading) {
        return <div>Loading availability...</div>
    }

    if (setupError) {
        return (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4 rounded-lg">
                <p className="font-bold text-red-800 dark:text-red-200">An Error Occurred</p>
                <p className="text-sm text-red-700 dark:text-red-300">{setupError}</p>
            </div>
        );
    }

    return (
        <div className="bg-card-background p-6 rounded-lg shadow-elegant-lg grid md:grid-cols-2 gap-8 animate-fade-in">
            <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Block Out Time</h2>
                 <div className="flex justify-between items-center mb-4">
                  <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Previous Month">&larr;</button>
                  <h3 className="text-lg font-semibold text-primary">
                    {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-border-color" aria-label="Next Month">&rarr;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                  {dayLabels.map(day => <div key={day} className="font-bold text-text-secondary text-xs sm:text-sm">{day}</div>)}
                  {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                  {daysInMonth.map(day => {
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    const isBlocked = unavailabilitiesForMonth.some(u => new Date(u.unavailable_date + 'T00:00:00').toDateString() === day.toDateString());
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => setSelectedDate(day)}
                        className={`p-2 rounded-full transition-colors duration-200 text-sm relative ${
                          isSelected ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-primary-light'
                        }`}
                      >
                        {day.getDate()}
                        {isBlocked && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>}
                      </button>
                    )
                  })}
                </div>
                <form onSubmit={handleAddUnavailability} className="mt-6 space-y-4">
                    <h3 className="font-semibold text-text-primary">Block for: {selectedDate.toLocaleDateString()}</h3>
                    <div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={isFullDay} onChange={e => setIsFullDay(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                            <span>Block full day</span>
                        </label>
                    </div>
                    {!isFullDay && (
                        <div className="flex space-x-2">
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 rounded-md bg-background border border-border-color" />
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 rounded-md bg-background border border-border-color" />
                        </div>
                    )}
                    <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (optional)" className="w-full p-2 rounded-md bg-background border border-border-color" />
                    <button type="submit" disabled={formLoading} className="w-full p-2 font-semibold rounded-md bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors">
                        {formLoading ? 'Blocking...' : 'Add Unavailability'}
                    </button>
                </form>
            </div>
            <div>
                 <h2 className="text-xl font-semibold text-primary mb-4">Current Unavailabilities</h2>
                 {feedback && <div className={`mb-4 p-3 rounded-md text-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{feedback.message}</div>}
                 <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                     {unavailabilities.length > 0 ? unavailabilities.sort((a,b) => new Date(a.unavailable_date).getTime() - new Date(b.unavailable_date).getTime()).map(u => (
                        <div key={u.id} className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
                            <div>
                                <p className="font-semibold">{new Date(u.unavailable_date + 'T00:00:00').toLocaleDateString()}</p>
                                <p className="text-sm text-text-secondary">
                                    {u.start_time ? `${u.start_time.slice(0, 5)} - ${u.end_time?.slice(0, 5)}` : 'All Day'}
                                    {u.reason && ` (${u.reason})`}
                                </p>
                            </div>
                            <button onClick={() => handleDeleteUnavailability(u.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                        </div>
                     )) : (
                        <p className="text-text-secondary text-center py-4">No unavailabilities scheduled.</p>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default AvailabilityManagement;
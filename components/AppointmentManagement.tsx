import React, { useState, useEffect } from 'react';
import { supabase } from '../src/services/supabaseClient';

interface Appointment {
    id: number;
    created_at: string;
    name: string;
    email: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
}

const AppointmentManagement: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0];
            const { data, error: dbError } = await supabase
                .from('appointments')
                .select('*')
                .gte('date', today) // Get today's and future appointments
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (dbError) {
                setError(`Failed to load appointments: ${dbError.message}`);
            } else {
                setAppointments(data as Appointment[]);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, []);

    if (loading) return <div className="text-center p-4">Loading appointments...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="bg-card-background p-6 rounded-lg shadow-elegant-lg animate-fade-in">
            <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Appointments</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {appointments.length > 0 ? (
                    appointments.map(appt => (
                        <div key={appt.id} className="p-4 border border-border-color rounded-lg bg-primary-light/50">
                            <p className="font-bold text-text-primary">
                                {new Date(appt.date + 'T' + appt.time).toLocaleString('default', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </p>
                            <p className="text-text-secondary">With: {appt.name} (<a href={`mailto:${appt.email}`} className="text-primary hover:underline">{appt.email}</a>)</p>
                            <p className="text-xs text-text-secondary/70">Booked on: {new Date(appt.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-text-secondary text-center py-8">No upcoming appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default AppointmentManagement;

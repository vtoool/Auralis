import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabaseClient';
import type { Appointment } from '../types';
import RescheduleModal from './RescheduleModal';

const AppointmentManagement: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [cancellingId, setCancellingId] = useState<number | null>(null);

    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);


    const fetchAppointments = useCallback(async () => {
        // Don't show feedback from previous actions when reloading
        setFeedback(null);
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
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleCancel = async (appointment: Appointment) => {
        if (window.confirm(`Are you sure you want to cancel the appointment with ${appointment.name} on ${appointment.date}? This cannot be undone.`)) {
            setCancellingId(appointment.id);
            setFeedback(null);

            // 1. Delete the appointment record
            const deleteAppointmentPromise = supabase
                .from('appointments')
                .delete()
                .eq('id', appointment.id);

            // 2. Delete the corresponding unavailability block to free up the slot.
            // Matching on date, start time, and the specific reason ensures we only delete the correct block.
            const deleteUnavailabilityPromise = supabase
                .from('unavailabilities')
                .delete()
                .match({ 
                    unavailable_date: appointment.date, 
                    start_time: `${appointment.time}:00`,
                    reason: `${appointment.name}'s appointment` 
                });

            const [appointmentResult, unavailabilityResult] = await Promise.all([
                deleteAppointmentPromise,
                deleteUnavailabilityPromise
            ]);
            
            if (appointmentResult.error || unavailabilityResult.error) {
                const errorMessage = appointmentResult.error?.message || unavailabilityResult.error?.message;
                setFeedback({ type: 'error', message: `Cancellation failed: ${errorMessage}` });
                console.error("Cancellation error:", appointmentResult.error || unavailabilityResult.error);
            } else {
                setFeedback({ type: 'success', message: 'Appointment cancelled successfully and the time slot is now available.' });
                // Refresh the list
                fetchAppointments();
            }

            setCancellingId(null);
        }
    };
    
    const handleOpenRescheduleModal = (appt: Appointment) => {
        setSelectedAppointment(appt);
        setIsRescheduleModalOpen(true);
    };

    const handleReschedule = async (appt: Appointment, newDate: Date, newTime: string) => {
        setLoading(true);
        setIsRescheduleModalOpen(false);
        setFeedback(null);

        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

        const { error: rpcError } = await supabase.rpc('reschedule_appointment', {
            p_appointment_id: appt.id,
            p_new_date: formattedDate,
            p_new_time: newTime
        });

        if (rpcError) {
            setFeedback({ type: 'error', message: `Reschedule failed: ${rpcError.message}` });
             console.error("Reschedule RPC error:", rpcError);
        } else {
            setFeedback({ type: 'success', message: 'Appointment rescheduled successfully. The client has been notified.' });
            fetchAppointments();
        }
        setLoading(false);
    };

    if (loading && !appointments.length) return <div className="text-center p-4">Loading appointments...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="bg-card-background p-6 rounded-lg shadow-elegant-lg animate-fade-in">
            <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Appointments</h2>
            {feedback && <div className={`mb-4 p-3 rounded-md text-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'}`}>{feedback.message}</div>}

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {appointments.length > 0 ? (
                    appointments.map(appt => (
                        <div key={appt.id} className="p-4 border border-border-color rounded-lg bg-primary-light/50">
                             <div className="flex flex-wrap gap-4 justify-between items-start">
                                <div>
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
                                    {appt.service && (
                                        <p className="text-sm text-text-secondary mt-1">
                                            <span className="font-semibold text-primary">Service:</span> {appt.service}
                                        </p>
                                    )}
                                    <p className="text-xs text-text-secondary/70">Booked on: {new Date(appt.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <button 
                                      onClick={() => handleOpenRescheduleModal(appt)}
                                      className="px-3 py-1.5 text-sm rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                                    >
                                        Reschedule
                                    </button>
                                    <button 
                                        onClick={() => handleCancel(appt)} 
                                        disabled={cancellingId === appt.id}
                                        className="px-3 py-1.5 text-sm rounded-md bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                                    >
                                        {cancellingId === appt.id ? 'Cancelling...' : 'Cancel'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-text-secondary text-center py-8">No upcoming appointments found.</p>
                )}
            </div>
            {isRescheduleModalOpen && selectedAppointment && (
                <RescheduleModal
                    appointment={selectedAppointment}
                    onClose={() => setIsRescheduleModalOpen(false)}
                    onReschedule={handleReschedule}
                />
            )}
        </div>
    );
};

export default AppointmentManagement;
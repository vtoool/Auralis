import React, { useState } from 'react';
import CourseManagement from './CourseManagement';
import AvailabilityManagement from './AvailabilityManagement';
import { useAuth } from '../context/AuthContext';
import AppointmentManagement from './AppointmentManagement';

type AdminTab = 'courses' | 'availability' | 'appointments';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('courses');
    const { signOut } = useAuth();
    
    const handleLogout = async () => {
        await signOut();
        window.location.hash = '/';
    };

    return (
        <div className="min-h-screen bg-background text-text-primary p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-4 border-b border-border-color">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                        <p className="text-text-secondary">Manage your courses and availability.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                         <a href="/#" className="text-sm text-primary hover:underline">View Site</a>
                        <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            Logout
                        </button>
                    </div>
                </header>

                <div className="flex space-x-1 sm:space-x-4 border-b border-border-color mb-6">
                    <button onClick={() => setActiveTab('courses')} className={`py-2 px-4 font-medium transition-colors ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-primary'}`}>
                        Course Management
                    </button>
                    <button onClick={() => setActiveTab('availability')} className={`py-2 px-4 font-medium transition-colors ${activeTab === 'availability' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-primary'}`}>
                        Availability
                    </button>
                    <button onClick={() => setActiveTab('appointments')} className={`py-2 px-4 font-medium transition-colors ${activeTab === 'appointments' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-primary'}`}>
                        Appointments
                    </button>
                </div>

                <main>
                    {activeTab === 'courses' && <CourseManagement />}
                    {activeTab === 'availability' && <AvailabilityManagement />}
                    {activeTab === 'appointments' && <AppointmentManagement />}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
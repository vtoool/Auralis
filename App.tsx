

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OasisThemeSite from './components/OasisThemeSite';
import OasisHeader from './components/oasis/OasisHeader';
import OasisFooter from './components/oasis/OasisFooter';
import OasisShop from './components/oasis/OasisShop';
import OasisBlog from './components/oasis/OasisBlog';
import OasisBookingPage from './components/oasis/OasisBookingPage';
import OasisCheckoutPage from './components/oasis/OasisCheckoutPage';
import OasisCoursesPage from './components/oasis/OasisCoursesPage';
import LoadingSpinner from './components/LoadingSpinner';

const OasisPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-background text-text-primary font-sans transition-colors duration-300 theme-oasis">
        <OasisHeader />
        <main id="main-content" className="pt-24">{children}</main>
        <OasisFooter />
    </div>
);

const PublicSite: React.FC = () => {
    const [route, setRoute] = React.useState(window.location.hash || '#/');

    React.useEffect(() => {
        const handleHashChange = () => setRoute(window.location.hash || '#/');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routePath = route.split('?')[0];

    switch(routePath) {
        case '#/shop':
            return <OasisPageLayout><OasisShop /></OasisPageLayout>;
        case '#/blog':
            return <OasisPageLayout><OasisBlog /></OasisPageLayout>;
        case '#/booking':
             return <OasisPageLayout><OasisBookingPage /></OasisPageLayout>;
        case '#/checkout':
             return <OasisPageLayout><OasisCheckoutPage /></OasisPageLayout>;
        case '#/courses':
             return <OasisPageLayout><OasisCoursesPage /></OasisPageLayout>;
        default:
            return <OasisThemeSite />;
    }
}


const AppRoutes: React.FC = () => {
    const [route, setRoute] = React.useState(window.location.hash);

    React.useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (route.startsWith('#/login')) {
        return <Login />;
    }

    if (route.startsWith('#/admin')) {
        return (
            <ProtectedRoute>
                <AdminDashboard />
            </ProtectedRoute>
        );
    }

    return <PublicSite />;
}


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
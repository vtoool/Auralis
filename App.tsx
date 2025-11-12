



import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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


const OriginalThemeSite: React.FC = () => (
  <div className="bg-background text-text-primary font-sans transition-colors duration-300">
    <Header />
    <main>
      <Hero />
      <Courses />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <Booking />
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </main>
    <Footer />
  </div>
);

const OasisPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-background text-text-primary font-sans transition-colors duration-300 theme-oasis">
        <OasisHeader />
        <main id="main-content">{children}</main>
        <OasisFooter />
    </div>
);


const PublicSite: React.FC = () => {
    const { themeName } = useTheme();
    const [route, setRoute] = React.useState(window.location.hash || '#/');

    React.useEffect(() => {
        const handleHashChange = () => setRoute(window.location.hash || '#/');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routePath = route.split('?')[0];

    if (themeName === 'oasis') {
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
    
    // Fallback for other themes or if no specific oasis route matches
    return <OriginalThemeSite />;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a timeout to ensure the loading animation is visible for a pleasant duration,
    // improving perceived performance while assets load in the background.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider>
       <div 
        className={`fixed inset-0 z-[200] transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isLoading}
      >
        <LoadingSpinner />
      </div>
      
      <div className={`transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <AppRoutes />
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
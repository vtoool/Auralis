import React from 'react';
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
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OasisThemeSite from './components/OasisThemeSite';

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

const PublicSite: React.FC = () => {
    const { themeName } = useTheme();

    if (themeName === 'oasis') {
        return <OasisThemeSite />;
    }

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
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
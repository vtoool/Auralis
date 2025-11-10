
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
import { CartProvider } from './context/CartContext';
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
        <main>{children}</main>
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
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

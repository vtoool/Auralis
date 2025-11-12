import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuralisThemeLogo } from './AuralisThemeLogo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect on success via AuthStateChange listener in App
      window.location.hash = '/admin';
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card-background p-8 rounded-xl shadow-elegant-lg animate-scale-up">
        <AuralisThemeLogo className="mb-8 justify-center" />
        <h1 className="text-2xl font-bold text-center text-primary mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email-login" className="sr-only">Email</label>
            <input 
              type="email" 
              id="email-login"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
              className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary" 
            />
          </div>
          <div>
            <label htmlFor="password-login" className="sr-only">Password</label>
            <input 
              type="password" 
              id="password-login"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
              className="w-full p-3 rounded-md bg-background border border-border-color focus:ring-2 focus:ring-primary" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full p-3 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-center pt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
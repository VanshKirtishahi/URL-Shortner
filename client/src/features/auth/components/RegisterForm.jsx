import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm({ onToggleForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
      {error && (
        <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted">Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-ink border border-muted/30 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-accent transition-colors"
          placeholder="Alex Developer"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-ink border border-muted/30 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-accent transition-colors"
          placeholder="developer@example.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-ink border border-muted/30 rounded-md px-3 py-2 text-gray-200 focus:outline-none focus:border-accent transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="mt-2 bg-accent text-ink font-semibold py-2 rounded-md hover:bg-accent/80 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>

      <p className="text-sm text-muted text-center mt-4">
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={onToggleForm}
          className="text-accent hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
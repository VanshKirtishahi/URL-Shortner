import { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import NeoButton from '../shared/components/NeoButton';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, error, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login({ email, password });
    } else {
      await register({ name, email, password });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-satoshi selection:bg-neo-yellow selection:text-black">
      
      {/* Left Branding Side */}
      <div className="hidden md:flex flex-col justify-between bg-neo-yellow bg-dots p-12 border-r-2 border-black">
        <Link to="/" className="flex items-center gap-3 w-max">
          <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
            <Zap className="text-neo-yellow w-6 h-6" fill="currentColor" />
          </div>
          <span className="font-cabinet font-extrabold text-2xl tracking-tight">ShortLink.</span>
        </Link>
        <div>
          <h1 className="font-cabinet font-extrabold text-6xl leading-[1.1] mb-6">
            Build your empire,<br/>one link at a time.
          </h1>
          <p className="font-bold text-xl border-2 border-black bg-white inline-block px-4 py-2 shadow-hard">
            Welcome to the performance tier.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="bg-[#f4f4f5] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border-2 border-black p-8 rounded-2xl shadow-hard-xl">
          
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-neo-yellow border-2 border-black rounded flex items-center justify-center">
              <Zap className="text-black w-4 h-4" />
            </div>
            <span className="font-cabinet font-extrabold text-xl">ShortLink.</span>
          </div>

          <h2 className="font-cabinet font-extrabold text-4xl mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="font-medium text-gray-600 mb-8">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start optimizing your links today.'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-black text-red-800 font-bold rounded-lg shadow-hard">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-sm">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white border-2 border-black p-3 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-2 border-black p-3 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-2 border-black p-3 rounded-xl font-medium outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#000] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 bg-black text-white font-bold py-4 rounded-xl border-2 border-black shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <p className="mt-8 text-center font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-black hover:underline decoration-2 underline-offset-4"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
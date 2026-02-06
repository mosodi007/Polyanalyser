import { useState } from 'react';
import { X, Mail, Lock, Chrome, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export function Login({ onClose, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      setError(err.message || 'Failed to log in with Google. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass-white rounded-3xl shadow-2xl border-2 border-black/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-lg transition-colors z-10"
          aria-label="Close login"
        >
          <X className="w-5 h-5 text-black/50" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/polyanalyser.png" alt="PolyAnalyser" className="w-10 h-10" />
              <h2 className="text-2xl font-bold text-black">Polyanalyser</h2>
            </div>
            <p className="text-black/60">Welcome back! Log in to continue</p>
          </div>

          {/* <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 glass-strong hover:bg-black/5 text-black font-medium rounded-xl transition-all border-2 border-black/10 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black/50">Or log in with email</span>
            </div>
          </div> */}

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-11 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-black/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-black/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a href="/forgot-password" className="text-sm text-[#1552F0] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-semibold rounded-xl transition-all shadow-lg border-2 border-[#1552F0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-black/60">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-[#1552F0] hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
